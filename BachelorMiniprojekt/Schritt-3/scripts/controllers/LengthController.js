angular.module('ConverterApp').controller('LengthController', function ($scope) {
	var filterArray = function (input, excludeItems) {
		var newArray = [];
		for (var inputIndex in input) {
			var inExcludeList = false;
			for (var excludeIndex in excludeItems) {
				inExcludeList = inExcludeList || input[inputIndex] === excludeItems[excludeIndex];
			}
			if (!inExcludeList) {
				newArray.push(input[inputIndex]);
			}
		}
		return newArray;
	};

	$scope.model = {
		inputUnit: 'm',
		outputUnit: 'ft',
		availableUnits: ['m', 'km', 'ft'],
		availableInputUnits: ['km', 'ft'],
		availableOutputUnits: ['km'],
		input: 100,
		changeInputUnit: function (newInputUnit) {
			this.inputUnit = newInputUnit;
			this.availableInputUnits = filterArray(this.availableUnits, [this.inputUnit]);
			if (this.inputUnit === this.outputUnit) {
				this.outputUnit = this.availableOutputUnits[0];
			}
			this.availableOutputUnits = filterArray(this.availableUnits, [this.inputUnit, this.outputUnit]);
		},
		changeOutputUnit: function (newOutputUnit) {
			this.outputUnit = newOutputUnit;
			if (this.inputUnit === this.outputUnit) {
				this.outputUnit = filterArray(this.availableUnits, [this.inputUnit, this.outputUnit])[0];
			}
			this.availableOutputUnits = filterArray(this.availableUnits, [this.inputUnit, this.outputUnit]);
		},
		getOutput: function () {
			var outputLength = this.input;

			if (this.inputUnit === 'km') {
				outputLength *= 1000;
			} else if (this.inputUnit === 'ft') {
				outputLength *= 0.3048;
			}

			if (this.outputUnit === 'km') {
				outputLength /= 1000;
			} else if (this.outputUnit === 'ft') {
				outputLength /= 0.3048;
			}

			return Math.round(outputLength*1000)/1000;
		}
	};
});