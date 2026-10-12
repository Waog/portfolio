$version: "2.0"

namespace com.oliverstadie.portfolio

use aws.protocols#restJson1
use smithy.framework#ValidationException

/// TODO: describe your service here
@title("PortfolioApi")
@restJson1
service PortfolioApi {
    version: "1.0.0"
    operations: [
        Echo
    ]
    errors: [
        ValidationException
    ]
}
