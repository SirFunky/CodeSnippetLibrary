import type { LanguageRegistration } from "shiki/core";
// Small project-owned TextMate grammar. Code is still rendered only by Shiki.
const cobol: LanguageRegistration = {
  name: "cobol",
  displayName: "COBOL",
  scopeName: "source.cobol",
  repository: {},
  patterns: [
    { name: "comment.line.cobol", match: "^[ 0-9]{6}[*/].*$" },
    { name: "comment.line.cobol", match: "\\*>.*$" },
    {
      name: "string.quoted.double.cobol",
      begin: '"',
      end: '"',
      patterns: [{ match: '""', name: "constant.character.escape.cobol" }],
    },
    {
      name: "string.quoted.single.cobol",
      begin: "'",
      end: "'",
      patterns: [{ match: "''", name: "constant.character.escape.cobol" }],
    },
    {
      name: "keyword.control.cobol",
      match:
        "(?i)(?<![A-Za-z0-9-])(?:IDENTIFICATION|ENVIRONMENT|CONFIGURATION|INPUT-OUTPUT|DATA|PROCEDURE|DIVISION|SECTION|PROGRAM-ID|FILE-CONTROL|SELECT|ASSIGN|ORGANIZATION|LINE|SEQUENTIAL|FILE|STATUS|FD|WORKING-STORAGE|PIC|PICTURE|VALUE|VALUES|OCCURS|INDEXED|BY|REDEFINES|RENAMES|SIGN|IS|ARE|TO|FROM|INTO|GIVING|REMAINDER|ROUNDED|ON|SIZE|ERROR|NOT|END-ADD|END-SUBTRACT|END-MULTIPLY|END-DIVIDE|END-COMPUTE|ADD|SUBTRACT|MULTIPLY|DIVIDE|COMPUTE|MOVE|DISPLAY|ACCEPT|IF|ELSE|END-IF|EVALUATE|WHEN|OTHER|END-EVALUATE|PERFORM|VARYING|UNTIL|THRU|THROUGH|END-PERFORM|TIMES|INITIALIZE|STRING|UNSTRING|DELIMITED|SPACE|SPACES|ZERO|ZEROS|LOW-VALUES|HIGH-VALUES|ALL|END-STRING|END-UNSTRING|INSPECT|TALLYING|REPLACING|FOR|FUNCTION|OPEN|INPUT|OUTPUT|EXTEND|I-O|CLOSE|READ|WRITE|REWRITE|DELETE|START|AT|END|END-READ|END-WRITE|STOP|RUN|GOBACK|EXIT|CONTINUE|COPY|REPLACING|USAGE|COMP|COMP-3|COMP-5|BINARY|PACKED-DECIMAL|AND|OR|GREATER|LESS|THAN|EQUAL|POSITIVE|NEGATIVE|NUMERIC|ALPHABETIC)(?![A-Za-z0-9-])",
    },
    {
      name: "constant.numeric.cobol",
      match: "(?<![A-Za-z0-9-])[+-]?[0-9]+(?:\\.[0-9]+)?(?![A-Za-z0-9-])",
    },
    { name: "variable.other.cobol", match: "(?i)[A-Z][A-Z0-9-]*" },
    { name: "keyword.operator.cobol", match: "[+*/=<>-]" },
  ],
};
export default cobol;
