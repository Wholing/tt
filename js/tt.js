//ko.validation.rules.pattern.message = 'Invalid.';

//ko.extenders.numeric = function(target) {
//	target.hasError = ko.observable();
	//target.validationMessage = ko.observable();

//	function validate(newValue) {

//	}
//}

var Action = function(id, description)
{
	this.id = id;
	this.description = description;
}

var ViewModelLayout = function(identifier)
{
	var self = this; 
	var _identifier = identifier;

	self.buttons = ko.observableArray( [
		ko.observableArray( ['1','2','3']),
		ko.observableArray( ['4','5','6']),
		ko.observableArray( ['7','8','9']),
		ko.observableArray( ['!','0','<'])  
		]); 
	self.actionButtons = ko.observableArray([
		new Action(0, 'In'), 
    	new Action(1, 'out lunch'),
    	new Action(2, 'in lunch'),
    	new Action(3, 'Out'), 
		]);

	self.actionbuttonPress = function(action) {
        alert(action.description);
//        if (ViewModelLayout.errors().length == 0) {
//            alert('Thank you.');
//        } else {
//            alert('Please check your submission.');
//            ViewModelLayout.errors.showAllMessages();
//        };				
	};

	self.buttonPress = function(data) {
		self.addValue(data);
	};
	self.clearValues = function() {
		_identifier('');
	};	
	self.removeLastValue = function() {
		if (_identifier().length > 0)
		{
			var actualValues = _identifier();
			var newValues = actualValues.substring(0, actualValues.length-1);
			_identifier(newValues);
		}
	};

	self.addValue = function(newValue) {
		if (newValue=='<')
		{
			self.removeLastValue();
			return;
		}
		if (newValue=="!")
		{
			self.clearValues();
			return;
		}
		var newValue = _identifier() + newValue;
		_identifier(newValue);
	};


};


var ViewModel = function(repo)
{
	var self = this;
	self.identifier = ko.observable('').extend( { number: true}); //.extend({ minLength: 2, maxLength: 10 });
	self.actions = ko.observableArray();
    self.errorMessage = ko.observable('');

    self.layout = new ViewModelLayout(self.identifier);

    self._repo = repo;

    self._getPerson = function()
    {
    	return self._repo.getById(self.identifier());
    }

	self.addAction = function(action) {
		var person = self._getPerson();
		if (person == null)
		{
			self.errorMessage("Person not found");
		}
		else
		{
			person.actions.push(action);
			self._repo.add(person);
			self._repo.save();
			self.actions.push(action);
		}
	};

	self.lastAction = function() {
		var person = self._getPerson();
		if (person != null)
		{
			return person.actions[person.actions.length-1];
		}
		return null;
	};

	self.isIdentifierValid = function() {
		var person = self._getPerson();
		return person != null;
	}

	self.clearErrorMessage = function () {
		self.errorMessage('');
	};

	self.clearIdentifier = function () {
		self.identifier('');
	};

}