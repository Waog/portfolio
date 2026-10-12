$version: "2.0"

namespace com.oliverstadie.portfolio

/// An example operation
@http(method: "GET", uri: "/echo")
@readonly
operation Echo {
    input := {
        @httpQuery("message")
        @required
        @length(max: 1024)
        message: String
    }
    output := {
        @required
        message: String
    }
}
