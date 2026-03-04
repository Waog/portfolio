import 'jest-expect-message';

import { runTask } from './search-engine-worker-task';
import {
  SEARCH_ENGINE_WORKER_PROGRESS_KIND,
  SEARCH_ENGINE_WORKER_REQUEST_KIND,
  SEARCH_ENGINE_WORKER_RESULT_KIND,
  SearchEngineWorkerOutput,
  SearchEngineWorkerResult,
} from './search-engine.types';

describe('SearchEngineWorkerTask.runTask()', () => {
  it('creates', () => {
    expect(runTask).toBeTruthy();
  });

  it('calls postMessage callback with result for empty input', async () => {
    const input = {
      kind: SEARCH_ENGINE_WORKER_REQUEST_KIND,
      queryId: 1,
      query: [],
    };

    jest.useFakeTimers();
    const postMessageMock = jest.fn();

    try {
      runTask(input, postMessageMock);
      await jest.runAllTimersAsync();

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: SEARCH_ENGINE_WORKER_RESULT_KIND,
        })
      );
    } finally {
      jest.useRealTimers();
    }

    const resultMessage: SearchEngineWorkerResult = postMessageMock.mock.calls
      .map(([message]) => message)
      .find(message => message.kind === SEARCH_ENGINE_WORKER_RESULT_KIND);

    expect(resultMessage).toBeDefined();
    expect(resultMessage.durationMs).toBeGreaterThanOrEqual(0);
    expect(resultMessage.workerFinishedTimestamp).toBeTruthy();
    expect(resultMessage.queryId).toEqual(input.queryId);
    expect(resultMessage.query).toEqual(input.query);
    expect(resultMessage.domainResult).toBeTruthy();
    expect(resultMessage.domainResult.query).toEqual(input.query);
    expect(resultMessage.domainResult.matchesOverview).toEqual([]);
    expect(resultMessage.domainResult.projects.length).toBeGreaterThanOrEqual(
      10
    );
    expect(resultMessage.domainResult.projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'lottery-websites',
          title: 'Enterprise Lottery Platform',
          role: 'Web Developer & Technical Consultant',
          technologies: expect.objectContaining({
            fullMatches: [],
            partialMatches: [],
            nonMatches: expect.arrayContaining(['Angular', 'SCSS']),
          }),
        }),
      ])
    );
    expect(resultMessage.domainResult.skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'Frontend',
          tagLists: expect.objectContaining({
            fullMatches: [],
            partialMatches: [],
            nonMatches: expect.arrayContaining(['Angular', 'SCSS']),
          }),
        }),
      ])
    );
    expect(resultMessage.domainResult.skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'Backend',
          tagLists: expect.objectContaining({
            fullMatches: [],
            partialMatches: [],
            nonMatches: expect.arrayContaining(['Node.js', 'Java']),
          }),
        }),
      ])
    );
  });

  it('calls postMessage callback with result for 4 search terms input', async () => {
    const input = {
      kind: SEARCH_ENGINE_WORKER_REQUEST_KIND,
      queryId: 1,
      query: ['Angular', 'CSS', 'AWS', 'Rust'],
    };

    jest.useFakeTimers();
    const postMessageMock = jest.fn();

    try {
      runTask(input, postMessageMock);
      await jest.runAllTimersAsync();

      expect(postMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: SEARCH_ENGINE_WORKER_RESULT_KIND,
        })
      );
    } finally {
      jest.useRealTimers();
    }

    const resultMessage: SearchEngineWorkerResult = postMessageMock.mock.calls
      .map(([message]) => message)
      .find(message => message.kind === SEARCH_ENGINE_WORKER_RESULT_KIND);

    expect(resultMessage).toBeDefined();
    expect(resultMessage.durationMs).toBeGreaterThanOrEqual(0);
    expect(resultMessage.workerFinishedTimestamp).toBeTruthy();
    expect(resultMessage.queryId).toEqual(input.queryId);
    expect(resultMessage.query).toEqual(input.query);
    expect(resultMessage.domainResult).toBeTruthy();
    expect(resultMessage.domainResult.query).toEqual(input.query);

    const matchesOverview = resultMessage.domainResult.matchesOverview;
    expect(matchesOverview).toHaveLength(4);

    expect(matchesOverview[0].keyword).toEqual('Angular');
    expect(matchesOverview[0].fullMatchesCount).toBeGreaterThan(0);
    expect(matchesOverview[0].partialMatchesCount).toBeGreaterThan(0);

    expect(matchesOverview[1].keyword).toEqual('CSS');
    expect(matchesOverview[1].fullMatchesCount).toBeGreaterThan(0);
    expect(matchesOverview[1].partialMatchesCount).toBeGreaterThanOrEqual(0);

    expect(matchesOverview[2].keyword).toEqual('AWS');
    expect(matchesOverview[2].fullMatchesCount).toBeGreaterThan(0);
    expect(matchesOverview[2].partialMatchesCount).toBeGreaterThan(0);

    expect(matchesOverview[3].keyword).toEqual('Rust');
    expect(matchesOverview[3].fullMatchesCount).toEqual(0);
    expect(matchesOverview[3].partialMatchesCount).toEqual(0);

    const projects = resultMessage.domainResult.projects;
    expect(projects.length).toBeGreaterThanOrEqual(10);
    expect(projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'lottery-websites',
          title: 'Enterprise Lottery Platform',
          role: 'Web Developer & Technical Consultant',
          technologies: expect.objectContaining({
            fullMatches: expect.arrayContaining(['Angular', 'CSS']),
            partialMatches: expect.arrayContaining(['RxJS']),
            nonMatches: expect.arrayContaining(['Node.js', 'Docker']),
          }),
        }),
      ])
    );

    const skills = resultMessage.domainResult.skills;
    expect(skills.length).toBe(8);
    expect(skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'Frontend',
          tagLists: expect.objectContaining({
            fullMatches: expect.arrayContaining(['Angular', 'CSS']),
            partialMatches: expect.arrayContaining(['RxJS']),
            nonMatches: expect.arrayContaining(['HTML', 'WebGL']),
          }),
        }),
      ])
    );
    expect(skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'Backend',
          tagLists: expect.objectContaining({
            fullMatches: expect.arrayContaining([]),
            partialMatches: expect.arrayContaining(['DynamoDB']),
            nonMatches: expect.arrayContaining(['Java', 'Node.js']),
          }),
        }),
      ])
    );
  });

  it('emits increasing progress updates before sending final result', async () => {
    const input = {
      kind: SEARCH_ENGINE_WORKER_REQUEST_KIND,
      queryId: 2,
      query: ['Angular', 'CSS', 'AWS', 'Rust'],
    };

    jest.useFakeTimers();
    const postMessageMock = jest.fn();

    try {
      runTask(input, postMessageMock);
      await jest.runAllTimersAsync();
    } finally {
      jest.useRealTimers();
    }

    const messages: SearchEngineWorkerOutput[] = postMessageMock.mock.calls.map(
      ([message]) => message
    );

    const progressMessages = messages.filter(
      message => message.kind === SEARCH_ENGINE_WORKER_PROGRESS_KIND
    );

    expect(progressMessages.length).toBeGreaterThan(5);

    for (let i = 1; i < progressMessages.length; i++) {
      expect(progressMessages[i].progressPercent).toBeGreaterThan(
        progressMessages[i - 1].progressPercent
      );
    }

    const resultMessages = messages.filter(
      message => message.kind === SEARCH_ENGINE_WORKER_RESULT_KIND
    );

    expect(resultMessages.length).toBe(1);
    const resultMessage = resultMessages[0];

    const lastMessage = messages[messages.length - 1];
    expect(lastMessage).toBe(resultMessage);
  });
});
