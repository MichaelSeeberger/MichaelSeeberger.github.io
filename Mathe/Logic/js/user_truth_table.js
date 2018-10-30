
function UserTruthTable(anAST) {
    this.ast = anAST;
    this.variables = Object.keys(anAST.variableValues).sort();
    this.htmlTable = null;
    this.latexTable = null;
}

UserTruthTable.prototype = {
    stringToLatex: function(aString) {
        aString = aString.replace(/~/g, '\\sim ');
        aString = aString.replace(/&/g, '\\& ');
        aString = aString.replace(/=/g, '\\equiv ');
        aString = aString.replace(/\|/g, '\\text{v}');
        aString = aString.replace(/>-</g, '\\text{\\textgreater-\\textless}');
        aString = aString.replace(/>(?!-)/g, '\\supset ');
        aString = aString.replace(/\^/g, '\\text{\\textgreater-\\textless}');
        return aString;
    },

    createTables: function() {
        this.htmlTable = '<table class="table">';
        this.htmlTable += '<thead>'
        this.htmlTable += '<tr>';

        this.latexTable = "<pre>\\begin{tabular}{";

        for (var theVariableIndex = 0; theVariableIndex < this.variables.length; theVariableIndex++) {
            this.htmlTable += '<th>'+this.variables[theVariableIndex]+'</th>';
            this.latexTable += 'l';
        }
        this.htmlTable += '<th>'+ stringToHTML($("#currentCode").text())+'</th>';
        this.htmlTable += '</tr></thead>'

        this.latexTable += "l}\n\t\\hline\n\t\\hline\n\t$"+this.variables.join('$ & $')+"$ & $" + this.stringToLatex($("#currentCode").text()) + "$\\\\\n\t\\hline\n";

        this.createRowsForVariables(this.variables);
        this.htmlTable += "</table>";
        this.latexTable += "\t\\hline\n\\end{tabular}</pre>"
    },

    textRepresentationForBoolean: function(aBoolean) {
        return aBoolean ? "W" : "F";
    },

    createTableRow: function() {
        this.htmlTable += "<tr>"
        this.latexTable += "\t";
        for (var variableIndex = 0; variableIndex < this.variables.length; variableIndex++) {
            var stringValue = this.textRepresentationForBoolean(this.ast.getVariableValue(this.variables[variableIndex]));
            this.htmlTable += "<td>"+stringValue+"</td>";
            this.latexTable += stringValue;
            this.latexTable += " & ";
        }
        this.htmlTable += "<th>"+this.textRepresentationForBoolean(this.ast.topLevelNode.result)+"</th>";
        this.htmlTable += "</tr>";
        this.latexTable += this.textRepresentationForBoolean(this.ast.topLevelNode.result);
        this.latexTable += " \\\\\n";
    },

    createRowsForVariables: function(theVariables) {
        var theCurrentVariable = theVariables[0];
        var theNewVariables = theVariables.slice(1,theVariables.length);
        var theStates = [true, false];
        for (var stateIndex = 0; stateIndex < theStates.length; stateIndex++) {
            this.ast.setVariableValue(theCurrentVariable, theStates[stateIndex]);
            if (theNewVariables.length > 0) {
                this.createRowsForVariables(theNewVariables);
            } else {
                this.ast.topLevelNode.execute();
                this.createTableRow();
            }
        }
    }
};
