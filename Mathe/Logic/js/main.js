var topLevelNode = null;

var mainAST = null;

function stringToHTML(aString) {
	aString = aString.replace(/=/g, '&equiv;');
	aString = aString.replace(/>-</g, '&gt;-&lt;');
	aString = aString.replace(/>(?!-)/g, '&sup;\1');
	aString = aString.replace(/\|/g, '<span class="italic">v</span>');
	aString = aString.replace(/\^/g, '&gt;-&lt;');
	return aString;
}

function didUpdateNode(aNode) {
	if (aNode.AST != mainAST)
		return;

	var theElement = $("#"+aNode.id);
	theElement.toggleClass("alert-success", aNode.result == true);
	theElement.toggleClass("alert-danger", aNode.result == false);
	x = 1;
}

function addNodeToParent(aNode, theParentElement) {
	var theListItem = $("<li>");
	var theLink = $("<a>", {
		href: "#",
		id: aNode.id,
		html: stringToHTML(aNode.displayName)
	});
	theListItem.append(theLink);
	theParentElement.append(theListItem);
	if (aNode.type == NODE_OP) {
		theLink.addClass("operator");
	}
	
	var children = aNode.children;
	if (typeof children == 'undefined' || children == null || children.length == 0) {
		return;
	}
	
	var theSublist = $("<ul>");
	theListItem.append(theSublist);
	for (var childIndex = 0; childIndex < children.length; childIndex++) {
		addNodeToParent(children[childIndex], theSublist);
	}
}

function createSyntaxTree(theAST) {
	var treeBase = $("#topLevelList");
	treeBase.html("");
	if (theAST.topLevelNode == null)
		return;
	
	addNodeToParent(theAST.topLevelNode, treeBase);
}

function createVariableSlider(variableName, variableValue) {
	var theSlider = $("<input>", {
		type: "checkbox",
		name: "var-"+variableName,
		"data-var-name": variableName,
		"data-label-text": variableName
	});
	
	theSlider.prop('checked', variableValue);
	
	var theContainer = $("<div>", {
		class: 'variableSliderContainer'
	});
	theContainer.append(theSlider);
	
	$("#variableList").append(theContainer);
	
	theSlider.on("switchChange.bootstrapSwitch", function(event, state) {
		var theVarName = $(this).data("var-name");
		mainAST.setVariableValue(theVarName, state);
		mainAST.topLevelNode.execute();
		didUpdateResult();
	});
	
	return theSlider;
}

function createVariableList() {
	var theVariableList = $("#variableList");
	theVariableList.html("");
	$.each(mainAST.variableValues, function(variableName, variableValue) {
		var theSlider = createVariableSlider(variableName, variableValue);
		theSlider.bootstrapSwitch();
	});
}

function didUpdateResult() {
	var resultContainer = $("#resultContainer");
	if (mainAST == null) {
		$("#resultContainerRow").hide();
	} else {
		$("#resultContainerRow").show();
		$("#resultAsWords").html(mainAST.topLevelNode.result == true ? "wahr" : "falsch");
		resultContainer.removeClass("alert-success");
		resultContainer.removeClass("alert-danger");
		resultContainer.addClass(mainAST.topLevelNode.result ? "alert-success" : "alert-danger");
	}
}

var defaultModal = null;
var errorModal = null;
var userTruthTableModal = null;

function setUpTruthTableBehaviour() {
	$('.truthTable').hide();
	$('#showTruthTableButton').hide();
	$("#showTruthTableButton").click(function() {
		var isHidden = $("#truthTableState").text() == "einblenden";
		$("#truthTableState").text(isHidden ? "ausblenden" : "einblenden");
		if (isHidden) {
			$(".truthTable").show();
		} else {
			$(".truthTable").hide();
		}
		return false;
	});

	$('#collapsibleHelp').on('hide.bs.collapse', function () {
		$("#showTruthTableButton").hide();
	});
	$('#collapsibleHelp').on('show.bs.collapse', function () {
		$("#showTruthTableButton").show();
	});
}

var userTruthTable = null;

$(function() {
	setConstantValue("wahr", true);
	setConstantValue("w", true);
	setConstantValue("true", true);

	setConstantValue("falsch", false);
	setConstantValue("f", false);
	setConstantValue("false", false);

	defaultModal = new ModalViewController('defaultModal');
	errorModal = new ModalViewController('errorModal');
	userTruthTableModal = new ModalViewController('userTruthTableModal');
	userTruthTableModal.defaultPrimaryButtonText = "Schliessen";

	$("#showUserTruthTableButton").click(function() {
		userTruthTableModal.runModal("Wahrheitstabelle");
	});

	setUpTruthTableBehaviour();

	didUpdateResult();
	
	$.fn.bootstrapSwitch.defaults.size = 'small';
	$.fn.bootstrapSwitch.defaults.labelWidth = '80px';
	
	$.fn.bootstrapSwitch.defaults.onColor = 'success';
	$.fn.bootstrapSwitch.defaults.offColor = 'danger';
	$.fn.bootstrapSwitch.defaults.onText = 'W';
	$.fn.bootstrapSwitch.defaults.offText = 'F';
	
	$("form").submit(function() { return false; });
	$("#submitLogic").click(function() {
		try {
			mainAST = parseString($("#logikInput").val());
			createSyntaxTree(mainAST);
			var theInputGroup = $("#logikInputFormGroup");
			if (mainAST != null) {
				var theBooleanResult = mainAST.topLevelNode.execute();
			}

			createVariableList();

			didUpdateResult();

            $("#currentCode").text($("#logikInput").val());
		} catch (error) {
			errorModal.runModal("Fehler in der Eingabe", error);
		}

		userTruthTable = new UserTruthTable(copyLogicAST(mainAST));
		userTruthTable.createTables();
		$("#userTruthTableModal #htmlTruthTable").html(userTruthTable.htmlTable);
		$("#userTruthTableModal #latexTruthTable").html(userTruthTable.latexTable);

		return false;
	});
});
