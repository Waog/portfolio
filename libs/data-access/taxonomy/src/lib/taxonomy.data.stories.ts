import type { Meta, StoryObj } from '@storybook/angular';
import { Network } from 'vis-network';

import { type TagName, TAXONOMY } from './taxonomy.data';

// Type definitions for the network data
interface NetworkNode {
  id: number;
  label: string;
  color?: {
    background: string;
    border: string;
  };
}

interface NetworkEdge {
  from: number;
  to: number;
  color: string;
  width: number;
  dashes: boolean | number[];
  arrows: {
    to?: {
      enabled: boolean;
      type: string;
      scaleFactor: number;
    };
    from?: {
      enabled: boolean;
      type: string;
      scaleFactor: number;
    };
  };
  smooth?: {
    enabled: boolean;
    type: string;
    roundness: number;
  };
}

interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

const meta: Meta = {
  title: 'Data Access/Taxonomy Data',
  component: null,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    // Schedule network creation after DOM is ready
    setTimeout(() => {
      const container = document.getElementById('network-container');
      if (!container || container.hasChildNodes()) return;

      // Generate nodes and edges from taxonomy data
      function generateNetworkData(): {
        data: NetworkData;
        nodeMap: Map<TagName, number>;
      } {
        const nodeMap = new Map<TagName, number>();
        const nodes: NetworkNode[] = [];
        const edges: NetworkEdge[] = [];
        let nodeIdCounter = 1;

        // Create nodes for all canonical names
        TAXONOMY.forEach(item => {
          const nodeId = nodeIdCounter++;
          nodeMap.set(item.canonical, nodeId);
          nodes.push({
            id: nodeId,
            label: item.canonical,
          });
        });

        // Create edges from relationships
        TAXONOMY.forEach(item => {
          const fromId = nodeMap.get(item.canonical);
          if (!fromId) return;

          // Parent/child relationships (is-a) - parent points to child, hollow triangle arrow
          if (item.children) {
            item.children.forEach(childName => {
              const toId = nodeMap.get(childName);
              if (toId) {
                edges.push({
                  from: fromId,
                  to: toId,
                  color: '#2E8B57', // Sea green for parent/child
                  width: 1,
                  dashes: false,
                  arrows: {
                    from: { enabled: true, type: 'triangle', scaleFactor: 1.0 },
                    to: { enabled: false, type: 'triangle', scaleFactor: 1.0 }, // Explicitly disable to-side arrows for parent/child
                  },
                });
              }
            });
          }

          // Includes relationships - dashed line with open arrow
          if (item.includes) {
            item.includes.forEach(includedName => {
              const toId = nodeMap.get(includedName);
              if (toId) {
                edges.push({
                  from: fromId,
                  to: toId,
                  color: '#4169E1', // Royal blue for includes
                  width: 1,
                  dashes: [5, 5], // Make includes dashed
                  arrows: {
                    to: { enabled: true, type: 'vee', scaleFactor: 1.0 },
                  },
                });
              }
            });
          }

          // Related relationships - dotted line with open arrow
          if (item.related) {
            item.related.forEach(relatedName => {
              const toId = nodeMap.get(relatedName);
              if (toId) {
                edges.push({
                  from: fromId,
                  to: toId,
                  color: '#FF6347', // Tomato red for related
                  width: 1,
                  dashes: [2, 3], // Make related dotted (smaller dashes)
                  arrows: {
                    to: { enabled: true, type: 'vee', scaleFactor: 1.0 },
                  },
                });
              }
            });
          }
        });

        // Add curves to edges and return data
        const curvedEdges = addEdgeCurves(edges);
        return { data: { nodes, edges: curvedEdges }, nodeMap };
      }

      // Function to add curves to multiple edges between same nodes
      function addEdgeCurves(edges: NetworkEdge[]): NetworkEdge[] {
        const edgeGroups = new Map<string, NetworkEdge[]>();

        // Group edges by node pairs (regardless of direction)
        edges.forEach(edge => {
          const key =
            edge.from < edge.to
              ? `${edge.from}-${edge.to}`
              : `${edge.to}-${edge.from}`;
          const group = edgeGroups.get(key);
          if (!group) {
            edgeGroups.set(key, [edge]);
          } else {
            group.push(edge);
          }
        });

        // Add curves to edges when there are multiple between same nodes
        return edges.map(edge => {
          const key =
            edge.from < edge.to
              ? `${edge.from}-${edge.to}`
              : `${edge.to}-${edge.from}`;
          const group = edgeGroups.get(key);

          if (!group || group.length === 1) {
            // Single edge - no curve needed
            return edge;
          } else {
            // Multiple edges - add curves
            const index = group.indexOf(edge);
            const totalEdges = group.length;
            const curveStep = 0.3; // Curve intensity

            // Calculate curve based on edge position in group
            let curve = 0;
            if (totalEdges === 2) {
              curve = index === 0 ? curveStep : -curveStep;
            } else {
              // For 3+ edges, distribute curves around center
              const center = (totalEdges - 1) / 2;
              curve = (index - center) * curveStep;
            }

            return {
              ...edge,
              smooth: {
                enabled: true,
                type: 'curvedCW',
                roundness: curve,
              },
            };
          }
        });
      }

      const { data, nodeMap } = generateNetworkData();

      const options = {
        nodes: {
          shape: 'box',
          color: {
            background: '#ffffff',
            border: '#000000',
          },
          font: {
            size: 12,
            color: '#000000',
            face: 'Arial',
            multi: true,
          },
          borderWidth: 1,
          margin: {
            top: 3,
            right: 8,
            bottom: 3,
            left: 8,
          },
        },
        edges: {
          smooth: false,
          color: '#000000',
          arrows: {
            to: {
              enabled: true, // Enable arrows globally on the to side (default for most relationships)
              scaleFactor: 1.0,
            },
          },
        },
        layout: {
          hierarchical: {
            enabled: true,
            direction: 'LR', // Left to Right
            sortMethod: 'directed',
            shakeTowards: 'roots',
            levelSeparation: 180, // Reduced from 240 (was originally 120, so this is 1.5x)
            nodeSpacing: 40, // Keep the vertical spacing as is
            treeSpacing: 100, // Keep same
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
          },
        },
        physics: {
          enabled: false, // Disable physics to maintain tree structure
        },
        interaction: {
          dragNodes: true, // Enable node dragging
        },
      };

      new Network(container, data, options);

      // Add click event listener for node highlighting
      const network = new Network(container, data, options);
      const selectedNodes = new Set<number>();
      const hiddenNodes = new Set<number>();

      // URL parameter management for Storybook (iframe communication)
      function updateUrlParams() {
        const selectedTerms = Array.from(selectedNodes)
          .map(id => {
            const node = data.nodes.find(n => n.id === id);
            return node?.label || '';
          })
          .filter(label => label)
          .sort();

        const hiddenTerms = Array.from(hiddenNodes)
          .map(id => {
            const node = data.nodes.find(n => n.id === id);
            return node?.label || '';
          })
          .filter(label => label)
          .sort();

        try {
          // Access parent window URL (Storybook main window)
          const parentUrl = new URL(window.parent.location.href);

          // Save selected terms
          if (selectedTerms.length > 0) {
            parentUrl.searchParams.set('terms', selectedTerms.join(','));
          } else {
            parentUrl.searchParams.delete('terms');
          }

          // Save hidden terms
          if (hiddenTerms.length > 0) {
            parentUrl.searchParams.set('hidden', hiddenTerms.join(','));
          } else {
            parentUrl.searchParams.delete('hidden');
          }

          // Save checkbox settings
          parentUrl.searchParams.set('hideUnrelated', hideUnrelated.toString());
          parentUrl.searchParams.set(
            'highlightParents',
            highlightParents.toString()
          );
          parentUrl.searchParams.set(
            'highlightIncludes',
            highlightIncludes.toString()
          );
          parentUrl.searchParams.set(
            'highlightRelates',
            highlightRelates.toString()
          );
          parentUrl.searchParams.set(
            'highlightChildren',
            highlightChildren.toString()
          );
          parentUrl.searchParams.set(
            'highlightIncluded',
            highlightIncluded.toString()
          );
          parentUrl.searchParams.set(
            'highlightRelated',
            highlightRelated.toString()
          );

          window.parent.history.replaceState({}, '', parentUrl.toString());
        } catch {
          // Fallback if cross-origin restrictions apply
          console.warn(
            'Could not update parent URL, using postMessage fallback'
          );
          window.parent.postMessage(
            {
              type: 'UPDATE_URL_PARAMS',
              terms: selectedTerms.length > 0 ? selectedTerms.join(',') : null,
              hidden: hiddenTerms.length > 0 ? hiddenTerms.join(',') : null,
              settings: {
                hideUnrelated,
                highlightParents,
                highlightIncludes,
                highlightRelates,
                highlightChildren,
                highlightIncluded,
                highlightRelated,
              },
            },
            '*'
          );
        }
      }

      function loadFromUrlParams() {
        try {
          // Access parent window URL (Storybook main window)
          const parentUrl = new URL(window.parent.location.href);
          const termsParam = parentUrl.searchParams.get('terms');
          const hiddenParam = parentUrl.searchParams.get('hidden');

          // Load selected terms
          if (termsParam) {
            const termNames = termsParam
              .split(',')
              .map(t => t.trim())
              .filter(t => t);
            termNames.forEach(termName => {
              const nodeId = nodeMap.get(termName as TagName);
              if (nodeId) {
                selectedNodes.add(nodeId);
              }
            });
          }

          // Load hidden terms
          if (hiddenParam) {
            const hiddenTermNames = hiddenParam
              .split(',')
              .map(t => t.trim())
              .filter(t => t);
            hiddenTermNames.forEach(termName => {
              const nodeId = nodeMap.get(termName as TagName);
              if (nodeId) {
                hiddenNodes.add(nodeId);
              }
            });
          }

          // Load checkbox settings
          const hideUnrelatedParam =
            parentUrl.searchParams.get('hideUnrelated');
          const highlightParentsParam =
            parentUrl.searchParams.get('highlightParents');
          const highlightIncludesParam =
            parentUrl.searchParams.get('highlightIncludes');
          const highlightRelatesParam =
            parentUrl.searchParams.get('highlightRelates');
          const highlightChildrenParam =
            parentUrl.searchParams.get('highlightChildren');
          const highlightIncludedParam =
            parentUrl.searchParams.get('highlightIncluded');
          const highlightRelatedParam =
            parentUrl.searchParams.get('highlightRelated');

          if (hideUnrelatedParam !== null)
            hideUnrelated = hideUnrelatedParam === 'true';
          if (highlightParentsParam !== null)
            highlightParents = highlightParentsParam === 'true';
          if (highlightIncludesParam !== null)
            highlightIncludes = highlightIncludesParam === 'true';
          if (highlightRelatesParam !== null)
            highlightRelates = highlightRelatesParam === 'true';
          if (highlightChildrenParam !== null)
            highlightChildren = highlightChildrenParam === 'true';
          if (highlightIncludedParam !== null)
            highlightIncluded = highlightIncludedParam === 'true';
          if (highlightRelatedParam !== null)
            highlightRelated = highlightRelatedParam === 'true';

          // Update visualization after loading from URL (delayed to allow checkboxes to be set up)
          setTimeout(() => {
            if (selectedNodes.size > 0 || hiddenNodes.size > 0) {
              updateVisualization();
              updateSelectedChips();
            }
          }, 100);
        } catch {
          // Fallback if cross-origin restrictions apply
          console.warn('Could not read parent URL, requesting via postMessage');
          window.parent.postMessage(
            {
              type: 'REQUEST_URL_PARAMS',
            },
            '*'
          );

          // Listen for response
          window.addEventListener('message', event => {
            if (event.data.type === 'URL_PARAMS_RESPONSE') {
              if (event.data.terms) {
                const termNames = event.data.terms
                  .split(',')
                  .map((t: string) => t.trim())
                  .filter((t: string) => t);
                termNames.forEach((termName: string) => {
                  const nodeId = nodeMap.get(termName as TagName);
                  if (nodeId) {
                    selectedNodes.add(nodeId);
                  }
                });
              }

              if (event.data.hidden) {
                const hiddenTermNames = event.data.hidden
                  .split(',')
                  .map((t: string) => t.trim())
                  .filter((t: string) => t);
                hiddenTermNames.forEach((termName: string) => {
                  const nodeId = nodeMap.get(termName as TagName);
                  if (nodeId) {
                    hiddenNodes.add(nodeId);
                  }
                });
              }

              if (selectedNodes.size > 0 || hiddenNodes.size > 0) {
                updateVisualization();
                updateSelectedChips();
              }
            }
          });
        }
      }

      // Enable free dragging by temporarily enabling physics during drag
      network.on('dragStart', function (params) {
        if (params.nodes.length > 0) {
          // Temporarily enable physics for smooth dragging
          network.setOptions({
            physics: {
              enabled: true,
              stabilization: false,
            },
            layout: {
              hierarchical: {
                enabled: false, // Disable hierarchical constraints during drag
              },
            },
          });
        }
      });

      network.on('dragEnd', function (params) {
        if (params.nodes.length > 0) {
          // Disable physics again to maintain positions
          network.setOptions({
            physics: {
              enabled: false,
            },
            layout: {
              hierarchical: {
                enabled: false, // Keep hierarchical disabled after drag
              },
            },
          });
        }
      });

      function updateSelectedChips() {
        const chipsContainer = document.getElementById(
          'selected-chips'
        ) as HTMLElement;
        const showHiddenButton = document.getElementById(
          'show-hidden'
        ) as HTMLButtonElement;

        if (!chipsContainer) return;

        // Update button visibility
        if (showHiddenButton) {
          showHiddenButton.style.display =
            hiddenNodes.size > 0 ? 'inline-block' : 'none';
        }

        if (selectedNodes.size === 0 && hiddenNodes.size === 0) {
          chipsContainer.innerHTML = '';
          return;
        }

        // Get selected terms
        const selectedTerms = Array.from(selectedNodes)
          .map(id => {
            const node = data.nodes.find(n => n.id === id);
            return { id, label: node?.label || '', isHidden: false };
          })
          .filter(term => term.label)
          .sort((a, b) => a.label.localeCompare(b.label));

        // Get hidden terms
        const hiddenTerms = Array.from(hiddenNodes)
          .map(id => {
            const node = data.nodes.find(n => n.id === id);
            return { id, label: node?.label || '', isHidden: true };
          })
          .filter(term => term.label)
          .sort((a, b) => a.label.localeCompare(b.label));

        // Combine all terms
        const allTerms = [...selectedTerms, ...hiddenTerms];

        chipsContainer.innerHTML = allTerms
          .map(
            term => `
            <div class="selected-chip" style="display: inline-flex; align-items: center; background-color: ${
              term.isHidden ? '#CCCCCC' : '#FFD700'
            }; border: 1px solid ${
              term.isHidden ? '#999999' : '#FFA500'
            }; border-radius: 16px; padding: 4px 8px; margin: 2px; font-size: 12px;">
              <button
                class="chip-eye"
                data-node-id="${term.id}"
                data-is-hidden="${term.isHidden}"
                style="background: none; border: none; color: #000000; cursor: pointer; font-size: 14px; line-height: 1; padding: 0; margin-right: 4px;"
                title="${term.isHidden ? 'Show' : 'Focus on'} ${term.label}"
              >${term.isHidden ? '👁️‍🗨️' : '👁️'}</button>
              <span style="margin-right: 6px; color: #000000; font-weight: bold; ${
                term.isHidden ? 'text-decoration: line-through;' : ''
              }">${term.label}</span>
              <button
                class="chip-remove"
                data-node-id="${term.id}"
                data-is-hidden="${term.isHidden}"
                style="background: none; border: none; color: #000000; cursor: pointer; font-size: 14px; line-height: 1; padding: 0; margin: 0;"
                title="Remove ${term.label}"
              >×</button>
            </div>
          `
          )
          .join('');

        // Add click listeners to eye buttons
        chipsContainer.querySelectorAll('.chip-eye').forEach(button => {
          button.addEventListener('click', e => {
            e.stopPropagation();
            const nodeId = parseInt(button.getAttribute('data-node-id') || '0');
            const isHidden = button.getAttribute('data-is-hidden') === 'true';

            if (nodeId > 0) {
              if (isHidden) {
                // Show the node: remove from hidden, add to selected
                hiddenNodes.delete(nodeId);
                selectedNodes.add(nodeId);
              } else {
                // Hide the node: remove from selected, add to hidden
                selectedNodes.delete(nodeId);
                hiddenNodes.add(nodeId);
              }

              updateVisualization();
              updateSelectedChips();
              updateUrlParams();
            }
          });
        });

        // Add click listeners to remove buttons
        chipsContainer.querySelectorAll('.chip-remove').forEach(button => {
          button.addEventListener('click', e => {
            e.stopPropagation();
            const nodeId = parseInt(button.getAttribute('data-node-id') || '0');
            const isHidden = button.getAttribute('data-is-hidden') === 'true';

            if (nodeId > 0) {
              if (isHidden) {
                hiddenNodes.delete(nodeId);
              } else {
                selectedNodes.delete(nodeId);
              }
              updateVisualization();
              updateSelectedChips();
              updateUrlParams();
            }
          });
        });
      }

      network.on('click', function (params) {
        if (params.nodes.length > 0) {
          const clickedNodeId = params.nodes[0];

          // Always toggle selection (multi-select by default)
          if (selectedNodes.has(clickedNodeId)) {
            selectedNodes.delete(clickedNodeId);
          } else {
            selectedNodes.add(clickedNodeId);
          }

          updateVisualization();
          updateSelectedChips();
          updateUrlParams();
        }
        // Removed background click deselection - chips are sufficient for removal
      });

      // Add right-click context menu for hiding nodes
      network.on('oncontext', function (params) {
        params.event.preventDefault();

        if (params.nodes.length > 0) {
          const clickedNodeId = params.nodes[0];
          const node = data.nodes.find(n => n.id === clickedNodeId);

          if (node && confirm(`Hide node "${node.label}"?`)) {
            // Remove from selected if it was selected
            selectedNodes.delete(clickedNodeId);
            // Add to hidden
            hiddenNodes.add(clickedNodeId);

            updateVisualization();
            updateSelectedChips();
            updateUrlParams();
          }
        }
      });

      function findRelationships(
        nodeId: number,
        edges: NetworkEdge[],
        visited = new Set()
      ): {
        parents: Set<number>;
        included: Set<number>;
        related: Set<number>;
        children: Set<number>;
        includes: Set<number>;
        relates: Set<number>;
      } {
        if (visited.has(nodeId)) {
          return {
            parents: new Set(),
            included: new Set(),
            related: new Set(),
            children: new Set(),
            includes: new Set(),
            relates: new Set(),
          };
        }
        visited.add(nodeId);

        const parents = new Set<number>();
        const included = new Set<number>();
        const related = new Set<number>();
        const children = new Set<number>();
        const includes = new Set<number>();
        const relates = new Set<number>();

        edges.forEach(edge => {
          // Parents/Children relationships (triangle arrows)
          if (edge.to === nodeId && edge.arrows?.from?.type === 'triangle') {
            parents.add(edge.from);
            // Recursively find relationships
            const recursive = findRelationships(edge.from, edges, visited);
            recursive.parents.forEach(id => parents.add(id));
          }
          if (edge.from === nodeId && edge.arrows?.from?.type === 'triangle') {
            children.add(edge.to);
            // Recursively find relationships
            const recursive = findRelationships(edge.to, edges, visited);
            recursive.children.forEach(id => children.add(id));
          }

          // Includes relationships (vee arrows with dashes)
          if (
            edge.from === nodeId &&
            edge.arrows?.to?.type === 'vee' &&
            Array.isArray(edge.dashes) &&
            edge.dashes[0] === 5
          ) {
            includes.add(edge.to);
          }
          if (
            edge.to === nodeId &&
            edge.arrows?.to?.type === 'vee' &&
            Array.isArray(edge.dashes) &&
            edge.dashes[0] === 5
          ) {
            included.add(edge.from);
          }

          // Related relationships (vee arrows with dots) - bidirectional
          if (
            edge.from === nodeId &&
            edge.arrows?.to?.type === 'vee' &&
            Array.isArray(edge.dashes) &&
            edge.dashes[0] === 2
          ) {
            related.add(edge.to);
          }
          if (
            edge.to === nodeId &&
            edge.arrows?.to?.type === 'vee' &&
            Array.isArray(edge.dashes) &&
            edge.dashes[0] === 2
          ) {
            relates.add(edge.from);
          }
        });

        return { parents, included, related, children, includes, relates };
      }

      function highlightMultipleDependencies(
        selectedNodeIds: Set<number>,
        network: Network,
        data: NetworkData
      ) {
        const allParents = new Set<number>();
        const allIncluded = new Set<number>();
        const allRelated = new Set<number>();
        const allChildren = new Set<number>();
        const allIncludes = new Set<number>();
        const allRelates = new Set<number>();

        // Collect all relationship types for selected nodes
        selectedNodeIds.forEach(nodeId => {
          const relationships = findRelationships(nodeId, data.edges);

          if (highlightParents) {
            relationships.parents.forEach(id => allParents.add(id));
          }
          if (highlightIncludes) {
            relationships.includes.forEach(id => allIncludes.add(id));
          }
          if (highlightRelates) {
            relationships.relates.forEach(id => allRelates.add(id));
          }
          if (highlightChildren) {
            relationships.children.forEach(id => allChildren.add(id));
          }
          if (highlightIncluded) {
            relationships.included.forEach(id => allIncluded.add(id));
          }
          if (highlightRelated) {
            relationships.related.forEach(id => allRelated.add(id));
          }
        });

        // Combine all highlighted nodes
        const allHighlighted = new Set([
          ...allParents,
          ...allIncluded,
          ...allRelated,
          ...allChildren,
          ...allIncludes,
          ...allRelates,
        ]);

        // Update node colors
        const updatedNodes = data.nodes
          .filter(node => !hiddenNodes.has(node.id)) // Filter out hidden nodes
          .map((node: NetworkNode) => {
            if (selectedNodeIds.has(node.id)) {
              return {
                ...node,
                color: { background: '#FFD700', border: '#000000' },
              }; // Gold for selected
            } else if (
              allParents.has(node.id) ||
              allIncludes.has(node.id) ||
              allRelates.has(node.id)
            ) {
              return {
                ...node,
                color: { background: '#87CEEB', border: '#000000' },
              }; // Sky blue for dependees (parents, includes, relates)
            } else if (
              allChildren.has(node.id) ||
              allIncluded.has(node.id) ||
              allRelated.has(node.id)
            ) {
              return {
                ...node,
                color: { background: '#98FB98', border: '#000000' },
              }; // Light green for dependers (children, included, related)
            } else {
              return {
                ...node,
                color: { background: '#E0E0E0', border: '#000000' },
              }; // Gray for unrelated
            }
          });

        // Update edge colors and highlighting
        const relevantEdges = new Set<string>();
        data.edges.forEach((edge: NetworkEdge) => {
          const isRelevant =
            selectedNodeIds.has(edge.from) ||
            selectedNodeIds.has(edge.to) ||
            (selectedNodeIds.has(edge.from) && allHighlighted.has(edge.to)) ||
            (selectedNodeIds.has(edge.to) && allHighlighted.has(edge.from)) ||
            (allHighlighted.has(edge.from) && allHighlighted.has(edge.to));

          if (isRelevant) {
            // Also check if the relationship type is enabled
            // Parent/child relationships (triangle arrows with 'from' property)
            if (edge.arrows?.from?.type === 'triangle') {
              if (highlightParents || highlightChildren) {
                relevantEdges.add(`${edge.from}-${edge.to}`);
              }
            }
            // Includes relationships (dashed vee arrows)
            else if (
              edge.arrows?.to?.type === 'vee' &&
              Array.isArray(edge.dashes) &&
              edge.dashes[0] === 5
            ) {
              if (highlightIncludes || highlightIncluded) {
                relevantEdges.add(`${edge.from}-${edge.to}`);
              }
            }
            // Related relationships (dotted vee arrows)
            else if (
              edge.arrows?.to?.type === 'vee' &&
              Array.isArray(edge.dashes) &&
              edge.dashes[0] === 2
            ) {
              if (highlightRelates || highlightRelated) {
                relevantEdges.add(`${edge.from}-${edge.to}`);
              }
            } else {
              // Default case for other edge types
              relevantEdges.add(`${edge.from}-${edge.to}`);
            }
          }
        });

        const updatedEdges = data.edges
          .filter((edge: NetworkEdge) => {
            // Filter out edges connected to hidden nodes
            if (hiddenNodes.has(edge.from) || hiddenNodes.has(edge.to)) {
              return false;
            }

            // Filter out edges of disabled relationship types
            // Parent/child relationships (triangle arrows with 'from' property)
            if (edge.arrows?.from?.type === 'triangle') {
              return highlightParents || highlightChildren;
            }
            // Includes relationships (dashed vee arrows)
            if (
              edge.arrows?.to?.type === 'vee' &&
              Array.isArray(edge.dashes) &&
              edge.dashes[0] === 5
            ) {
              return highlightIncludes || highlightIncluded;
            }
            // Related relationships (dotted vee arrows)
            if (
              edge.arrows?.to?.type === 'vee' &&
              Array.isArray(edge.dashes) &&
              edge.dashes[0] === 2
            ) {
              return highlightRelates || highlightRelated;
            }
            return true; // Keep other edge types
          })
          .map((edge: NetworkEdge) => {
            if (relevantEdges.has(`${edge.from}-${edge.to}`)) {
              return { ...edge, width: 2 }; // Keep original color, increase width
            } else {
              return { ...edge, color: '#CCCCCC', width: 1 }; // Gray out irrelevant edges
            }
          });

        // Add curves to prevent edge overlap
        const curvedEdges = addEdgeCurves(updatedEdges);

        network.setData({ nodes: updatedNodes, edges: curvedEdges });
      }

      // Filter options - all enabled by default
      let hideUnrelated = true;
      let highlightParents = true;
      let highlightIncluded = true;
      let highlightRelated = true;
      let highlightChildren = true;
      let highlightIncludes = true;
      let highlightRelates = true;

      function updateVisualization() {
        if (selectedNodes.size > 0) {
          if (hideUnrelated) {
            showFilteredNetwork(selectedNodes, network, data);
          } else {
            highlightMultipleDependencies(selectedNodes, network, data);
          }
          focusOnSelectedNodes();
        } else {
          resetHighlighting(network, data);
        }
      }

      function focusOnSelectedNodes() {
        if (selectedNodes.size === 0) return;

        if (selectedNodes.size === 1) {
          const nodeId = Array.from(selectedNodes)[0];
          network.focus(nodeId, {
            scale: 1.5,
            animation: {
              duration: 1000,
              easingFunction: 'easeInOutQuad',
            },
          });
        } else {
          // Fit multiple nodes
          network.fit({
            nodes: Array.from(selectedNodes),
            animation: {
              duration: 1000,
              easingFunction: 'easeInOutQuad',
            },
          });
        }
      }

      function showFilteredNetwork(
        selectedNodeIds: Set<number>,
        network: Network,
        originalData: NetworkData
      ) {
        const allParents = new Set<number>();
        const allIncluded = new Set<number>();
        const allRelated = new Set<number>();
        const allChildren = new Set<number>();
        const allIncludes = new Set<number>();
        const allRelates = new Set<number>();

        // Collect all relationship types for selected nodes based on filter settings
        selectedNodeIds.forEach(nodeId => {
          const relationships = findRelationships(nodeId, originalData.edges);

          if (highlightParents) {
            relationships.parents.forEach(id => allParents.add(id));
          }
          if (highlightIncludes) {
            relationships.includes.forEach(id => allIncludes.add(id));
          }
          if (highlightRelates) {
            relationships.relates.forEach(id => allRelates.add(id));
          }
          if (highlightChildren) {
            relationships.children.forEach(id => allChildren.add(id));
          }
          if (highlightIncluded) {
            relationships.included.forEach(id => allIncluded.add(id));
          }
          if (highlightRelated) {
            relationships.related.forEach(id => allRelated.add(id));
          }
        });

        // Include selected nodes and all relevant relationships
        const relevantNodeIds = new Set([
          ...selectedNodeIds,
          ...allParents,
          ...allIncluded,
          ...allRelated,
          ...allChildren,
          ...allIncludes,
          ...allRelates,
        ]);

        // Filter nodes to only relevant ones and exclude hidden nodes
        const filteredNodes = originalData.nodes
          .filter(
            node => relevantNodeIds.has(node.id) && !hiddenNodes.has(node.id)
          )
          .map((node: NetworkNode) => {
            if (selectedNodeIds.has(node.id)) {
              return {
                ...node,
                color: { background: '#FFD700', border: '#000000' },
              }; // Gold for selected
            } else if (
              allParents.has(node.id) ||
              allIncludes.has(node.id) ||
              allRelates.has(node.id)
            ) {
              return {
                ...node,
                color: { background: '#87CEEB', border: '#000000' },
              }; // Sky blue for dependees (parents, includes, relates)
            } else if (
              allChildren.has(node.id) ||
              allIncluded.has(node.id) ||
              allRelated.has(node.id)
            ) {
              return {
                ...node,
                color: { background: '#98FB98', border: '#000000' },
              }; // Light green for dependers (children, included, related)
            } else {
              return node;
            }
          });

        // Filter edges to only those between relevant nodes AND enabled relationship types AND not connected to hidden nodes
        const filteredEdges = originalData.edges
          .filter(edge => {
            // First check if both nodes are relevant and not hidden
            if (
              !relevantNodeIds.has(edge.from) ||
              !relevantNodeIds.has(edge.to) ||
              hiddenNodes.has(edge.from) ||
              hiddenNodes.has(edge.to)
            ) {
              return false;
            }

            // Then check if the relationship type is enabled
            // Parent/child relationships (triangle arrows with 'from' property)
            if (edge.arrows?.from?.type === 'triangle') {
              return highlightParents || highlightChildren;
            }

            // Includes relationships (dashed vee arrows)
            if (
              edge.arrows?.to?.type === 'vee' &&
              Array.isArray(edge.dashes) &&
              edge.dashes[0] === 5
            ) {
              return highlightIncludes || highlightIncluded;
            }

            // Related relationships (dotted vee arrows)
            if (
              edge.arrows?.to?.type === 'vee' &&
              Array.isArray(edge.dashes) &&
              edge.dashes[0] === 2
            ) {
              return highlightRelates || highlightRelated;
            }

            return true; // Default case - show the edge
          })
          .map(edge => ({
            ...edge,
            width: 2, // Keep original colors, increase width
          }));

        // Add curves to prevent edge overlap
        const curvedEdges = addEdgeCurves(filteredEdges);

        network.setData({ nodes: filteredNodes, edges: curvedEdges });
      }

      function resetHighlighting(network: Network, data: NetworkData) {
        // Reset all nodes to white background, excluding hidden nodes
        const resetNodes = data.nodes
          .filter(node => !hiddenNodes.has(node.id))
          .map((node: NetworkNode) => ({
            ...node,
            color: { background: '#FFFFFF', border: '#000000' },
          }));

        // Reset all edges to original colors, excluding edges connected to hidden nodes
        const resetEdges = data.edges
          .filter(
            edge => !hiddenNodes.has(edge.from) && !hiddenNodes.has(edge.to)
          )
          .map((edge: NetworkEdge) => ({
            ...edge,
            width: 1,
          }));

        network.setData({ nodes: resetNodes, edges: resetEdges });
      }

      // Setup search functionality after a delay to ensure DOM is ready
      setTimeout(() => {
        setupSearchFunctionality();
      }, 200);

      function setupSearchFunctionality() {
        // Search functionality
        const searchInput = document.getElementById(
          'taxonomy-search'
        ) as HTMLInputElement;
        const searchDropdown = document.getElementById(
          'search-dropdown'
        ) as HTMLElement;
        const clearButton = document.getElementById(
          'clear-search'
        ) as HTMLButtonElement;

        if (!searchInput || !searchDropdown || !clearButton) {
          console.warn('Search elements not found in DOM');
          return;
        }

        let currentSelectedIndex = -1;
        let filteredTerms: { name: TagName; nodeId: number }[] = [];

        // Create searchable terms with their node IDs
        const searchableTerms = TAXONOMY.map(item => ({
          name: item.canonical,
          nodeId: nodeMap.get(item.canonical) || 0,
        }))
          .filter(term => term.nodeId > 0)
          .sort((a, b) => a.name.localeCompare(b.name));

        function filterTerms(query: string) {
          if (!query.trim()) {
            return [];
          }
          return searchableTerms
            .filter(term =>
              term.name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 10); // Limit to 10 results for performance
        }

        function showDropdown(terms: typeof searchableTerms) {
          if (terms.length === 0) {
            searchDropdown.style.display = 'none';
            return;
          }

          searchDropdown.innerHTML = terms
            .map(
              (term, index) => `
            <div
              class="dropdown-item"
              data-term="${term.name}"
              data-node-id="${term.nodeId}"
              style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #eee; ${
                index === currentSelectedIndex
                  ? 'background-color: #e9ecef;'
                  : ''
              }"
              onmouseover="this.style.backgroundColor='#e9ecef'"
              onmouseout="this.style.backgroundColor='${
                index === currentSelectedIndex ? '#e9ecef' : 'white'
              }'"
            >
              ${term.name}
            </div>
          `
            )
            .join('');

          searchDropdown.style.display = 'block';

          // Add click listeners to dropdown items
          searchDropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
              const termName = item.getAttribute('data-term') as TagName;
              const nodeIdStr = item.getAttribute('data-node-id');
              if (nodeIdStr) {
                const nodeId = parseInt(nodeIdStr);
                selectTerm(termName, nodeId);
              }
            });
          });
        }

        function selectTerm(termName: TagName, nodeId: number) {
          // Always toggle selection (multi-select by default)
          if (selectedNodes.has(nodeId)) {
            selectedNodes.delete(nodeId);
          } else {
            selectedNodes.add(nodeId);
          }

          // Clear search input
          searchInput.value = '';
          searchDropdown.style.display = 'none';
          currentSelectedIndex = -1;

          updateVisualization();
          updateSelectedChips();
          updateUrlParams();
        }

        function hideDropdown() {
          searchDropdown.style.display = 'none';
          currentSelectedIndex = -1;
        }

        // Search input event listeners
        searchInput.addEventListener('input', e => {
          const query = (e.target as HTMLInputElement).value;
          filteredTerms = filterTerms(query);
          currentSelectedIndex = -1;
          showDropdown(filteredTerms);
        });

        searchInput.addEventListener('keydown', e => {
          if (filteredTerms.length === 0) return;

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              currentSelectedIndex = Math.min(
                currentSelectedIndex + 1,
                filteredTerms.length - 1
              );
              showDropdown(filteredTerms);
              break;
            case 'ArrowUp':
              e.preventDefault();
              currentSelectedIndex = Math.max(currentSelectedIndex - 1, -1);
              showDropdown(filteredTerms);
              break;
            case 'Enter':
              e.preventDefault();
              if (
                currentSelectedIndex >= 0 &&
                filteredTerms[currentSelectedIndex]
              ) {
                const selected = filteredTerms[currentSelectedIndex];
                selectTerm(selected.name, selected.nodeId);
              }
              break;
            case 'Escape':
              hideDropdown();
              break;
          }
        });

        searchInput.addEventListener('blur', () => {
          // Delay hiding dropdown to allow for click events
          setTimeout(hideDropdown, 150);
        });

        clearButton.addEventListener('click', () => {
          searchInput.value = '';
          selectedNodes.clear();
          hiddenNodes.clear();
          hideDropdown();
          updateVisualization();
          updateSelectedChips();
          updateUrlParams();
        });

        // Show all hidden nodes button
        const showHiddenButton = document.getElementById(
          'show-hidden'
        ) as HTMLButtonElement;
        if (showHiddenButton) {
          showHiddenButton.addEventListener('click', () => {
            // Move all hidden nodes to selected
            hiddenNodes.forEach(nodeId => {
              selectedNodes.add(nodeId);
            });
            hiddenNodes.clear();

            updateVisualization();
            updateSelectedChips();
            updateUrlParams();
          });
        }

        // Load from URL parameters FIRST to set the correct values
        loadFromUrlParams();

        // Setup filter checkboxes AFTER loading from URL
        setTimeout(() => {
          const filterCheckbox = document.getElementById(
            'filter-checkbox'
          ) as HTMLInputElement;
          if (filterCheckbox) {
            filterCheckbox.checked = hideUnrelated;
            filterCheckbox.addEventListener('change', () => {
              hideUnrelated = filterCheckbox.checked;
              updateVisualization();
              updateUrlParams();
            });
          }

          // Setup relationship filter checkboxes
          const setupRelationshipCheckbox = (
            id: string,
            currentValue: boolean,
            setter: (value: boolean) => void
          ) => {
            const checkbox = document.getElementById(id) as HTMLInputElement;
            if (checkbox) {
              checkbox.checked = currentValue; // Use current value (potentially from URL)
              checkbox.addEventListener('change', () => {
                setter(checkbox.checked);
                updateVisualization();
                updateUrlParams();
              });
            }
          };

          setupRelationshipCheckbox(
            'highlight-parents',
            highlightParents,
            value => {
              highlightParents = value;
            }
          );
          setupRelationshipCheckbox(
            'highlight-includes',
            highlightIncludes,
            value => {
              highlightIncludes = value;
            }
          );
          setupRelationshipCheckbox(
            'highlight-relates',
            highlightRelates,
            value => {
              highlightRelates = value;
            }
          );
          setupRelationshipCheckbox(
            'highlight-children',
            highlightChildren,
            value => {
              highlightChildren = value;
            }
          );
          setupRelationshipCheckbox(
            'highlight-included',
            highlightIncluded,
            value => {
              highlightIncluded = value;
            }
          );
          setupRelationshipCheckbox(
            'highlight-related',
            highlightRelated,
            value => {
              highlightRelated = value;
            }
          );

          // Setup group toggle functionality after checkboxes are set up
          const dependeeToggle = document.getElementById(
            'dependee-group-toggle'
          );
          const dependerToggle = document.getElementById(
            'depender-group-toggle'
          );

          if (dependeeToggle) {
            dependeeToggle.addEventListener('click', () => {
              // Check if all dependee checkboxes are currently checked
              const allChecked =
                highlightParents && highlightIncludes && highlightRelates;
              const newState = !allChecked;

              // Update all dependee checkboxes
              highlightParents = newState;
              highlightIncludes = newState;
              highlightRelates = newState;

              // Update the UI checkboxes
              const parentsCheckbox = document.getElementById(
                'highlight-parents'
              ) as HTMLInputElement;
              const includesCheckbox = document.getElementById(
                'highlight-includes'
              ) as HTMLInputElement;
              const relatesCheckbox = document.getElementById(
                'highlight-relates'
              ) as HTMLInputElement;

              if (parentsCheckbox) parentsCheckbox.checked = newState;
              if (includesCheckbox) includesCheckbox.checked = newState;
              if (relatesCheckbox) relatesCheckbox.checked = newState;

              updateVisualization();
              updateUrlParams();
            });
          }

          if (dependerToggle) {
            dependerToggle.addEventListener('click', () => {
              // Check if all depender checkboxes are currently checked
              const allChecked =
                highlightChildren && highlightIncluded && highlightRelated;
              const newState = !allChecked;

              // Update all depender checkboxes
              highlightChildren = newState;
              highlightIncluded = newState;
              highlightRelated = newState;

              // Update the UI checkboxes
              const childrenCheckbox = document.getElementById(
                'highlight-children'
              ) as HTMLInputElement;
              const includedCheckbox = document.getElementById(
                'highlight-included'
              ) as HTMLInputElement;
              const relatedCheckbox = document.getElementById(
                'highlight-related'
              ) as HTMLInputElement;

              if (childrenCheckbox) childrenCheckbox.checked = newState;
              if (includedCheckbox) includedCheckbox.checked = newState;
              if (relatedCheckbox) relatedCheckbox.checked = newState;

              updateVisualization();
              updateUrlParams();
            });
          }
        }, 50); // End setTimeout for checkbox setup

        // Initialize chips display
        updateSelectedChips();

        // Close dropdown when clicking outside
        document.addEventListener('click', e => {
          if (
            !searchInput.contains(e.target as Node) &&
            !searchDropdown.contains(e.target as Node)
          ) {
            hideDropdown();
          }
        });
      }
    }, 100);

    return {
      template: `
        <div style="display: flex; flex-direction: column; gap: 15px; height: 100vh;">
          <div style="display: flex; align-items: center; gap: 10px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; flex-shrink: 0;">
            <label for="taxonomy-search" style="font-weight: bold; font-size: 14px;">Search:</label>
            <div style="position: relative; flex: 1; max-width: 400px;">
              <input
                id="taxonomy-search"
                type="text"
                placeholder="Type to search and select taxonomy terms..."
                style="width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;"
                autocomplete="off"
              />
              <div
                id="search-dropdown"
                style="position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ccc; border-top: none; border-radius: 0 0 4px 4px; max-height: 200px; overflow-y: auto; z-index: 1000; display: none;"
              ></div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; margin-left: 20px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="checkbox" id="filter-checkbox" checked style="cursor: pointer;" />
                <label for="filter-checkbox" style="font-size: 12px; cursor: pointer; white-space: nowrap;">Filter view</label>
              </div>
              <div style="font-size: 12px; color: #666;">|</div>
              <div style="display: flex; align-items: center; gap: 8px; padding: 4px 8px; border: 1px solid #4169E1; border-radius: 4px; background-color: #87CEEB;">
                <span id="dependee-group-toggle" style="font-size: 11px; font-weight: bold; color: #000080; cursor: pointer; text-decoration: underline;" title="Click to toggle all dependee checkboxes">Dependee (what it needs):</span>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="highlight-parents" checked style="cursor: pointer;" />
                    <label for="highlight-parents" style="font-size: 11px; cursor: pointer; white-space: nowrap;">Parents</label>
                  </div>
                  <div style="display: flex; align-items: center; height: 8px;">
                    <div style="width: 0; height: 0; border-right: 6px solid #2E8B57; border-top: 4px solid transparent; border-bottom: 4px solid transparent; margin-right: -1px;"></div>
                    <div style="height: 3px; width: 24px; background-color: #2E8B57; display: inline-block;"></div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="highlight-includes" checked style="cursor: pointer;" />
                    <label for="highlight-includes" style="font-size: 11px; cursor: pointer; white-space: nowrap;">Includes</label>
                  </div>
                  <div style="display: flex; align-items: center; height: 8px;">
                    <div style="height: 3px; width: 24px; background: repeating-linear-gradient(to right, #4169E1 0px, #4169E1 4px, transparent 4px, transparent 8px); display: inline-block;"></div>
                    <div style="width: 0; height: 0; border-left: 6px solid #4169E1; border-top: 4px solid transparent; border-bottom: 4px solid transparent; margin-left: -1px;"></div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="highlight-relates" checked style="cursor: pointer;" />
                    <label for="highlight-relates" style="font-size: 11px; cursor: pointer; white-space: nowrap;">Relates</label>
                  </div>
                  <div style="display: flex; align-items: center; height: 8px;">
                    <div style="height: 3px; width: 24px; background: repeating-linear-gradient(to right, #FF6347 0px, #FF6347 2px, transparent 2px, transparent 4px); display: inline-block;"></div>
                    <div style="width: 0; height: 0; border-left: 6px solid #FF6347; border-top: 4px solid transparent; border-bottom: 4px solid transparent; margin-left: -1px;"></div>
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; padding: 4px 8px; border: 1px solid #228B22; border-radius: 4px; background-color: #98FB98;">
                <span id="depender-group-toggle" style="font-size: 11px; font-weight: bold; color: #006400; cursor: pointer; text-decoration: underline;" title="Click to toggle all depender checkboxes">Depender (what needs it):</span>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="highlight-children" checked style="cursor: pointer;" />
                    <label for="highlight-children" style="font-size: 11px; cursor: pointer; white-space: nowrap;">Children</label>
                  </div>
                  <div style="display: flex; align-items: center; height: 8px;">
                    <div style="height: 3px; width: 24px; background-color: #2E8B57; display: inline-block;"></div>
                    <div style="width: 0; height: 0; border-left: 6px solid #2E8B57; border-top: 4px solid transparent; border-bottom: 4px solid transparent; margin-left: -1px;"></div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="highlight-included" checked style="cursor: pointer;" />
                    <label for="highlight-included" style="font-size: 11px; cursor: pointer; white-space: nowrap;">Included</label>
                  </div>
                  <div style="display: flex; align-items: center; height: 8px;">
                    <div style="width: 0; height: 0; border-right: 6px solid #4169E1; border-top: 4px solid transparent; border-bottom: 4px solid transparent; margin-right: -1px;"></div>
                    <div style="height: 3px; width: 24px; background: repeating-linear-gradient(to right, #4169E1 0px, #4169E1 4px, transparent 4px, transparent 8px); display: inline-block;"></div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="highlight-related" checked style="cursor: pointer;" />
                    <label for="highlight-related" style="font-size: 11px; cursor: pointer; white-space: nowrap;">Related</label>
                  </div>
                  <div style="display: flex; align-items: center; height: 8px;">
                    <div style="width: 0; height: 0; border-right: 6px solid #FF6347; border-top: 4px solid transparent; border-bottom: 4px solid transparent; margin-right: -1px;"></div>
                    <div style="height: 3px; width: 24px; background: repeating-linear-gradient(to right, #FF6347 0px, #FF6347 2px, transparent 2px, transparent 4px); display: inline-block;"></div>
                  </div>
                </div>
              </div>
            </div>
            <button
              id="clear-search"
              style="padding: 8px 16px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;"
            >
              Clear All
            </button>
            <button
              id="show-hidden"
              style="padding: 8px 16px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; margin-left: 8px; display: none;"
            >
              Show All Hidden
            </button>
          </div>
          <div id="selected-chips" style="min-height: 20px; padding: 0 10px; display: flex; flex-wrap: wrap; gap: 4px; flex-shrink: 0;"></div>
          <div style="display: flex; gap: 20px; flex: 1; min-height: 0;">
            <div id="network-container" style="flex: 1; border: 1px solid #ccc;"></div>
          </div>
        </div>
      `,
    };
  },
};
