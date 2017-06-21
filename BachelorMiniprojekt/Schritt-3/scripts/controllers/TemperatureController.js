angular.module('ConverterApp').controller('TemperatureController', function ($scope) {
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
		inputUnit: '°C',
		outputUnit: '°F',
		availableUnits: ['°C', '°F', 'K'],
		availableInputUnits: ['°F', 'K'],
		availableOutputUnits: ['K'],
		input: 20,
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
			var outputTemp = this.input;

			if (this.inputUnit === 'K') {
				outputTemp -= 273.15;
			} else if (this.inputUnit === '°F') {
				outputTemp = (this.input-32)/1.8;
			}

			if (this.outputUnit === 'K') {
				outputTemp += 273.15;
			} else if (this.outputUnit === '°F') {
				outputTemp = outputTemp*1.8+32;
			}

			return Math.round(outputTemp*100)/100;
		}
	};
});