var CreateMockRepo = function() {
	return new MemoryRepo();	
} ;
var AddMockPersonToRepo = function(repo, id)
{
	if (id == undefined || id == null)
	{
		id = 1;
	}
	var person = { 'id': id, 'name' : 'Nils, Nilsson', "actions" : [] };
	repo.add(id, person);
	repo.save();
	return id;
};


describe("Main test", function() {
	it('Should be testable', function() {
		expect(true).toBe(true);
	});
	it('Should be able to enter identifier for entry', function()
	{
		var target = new ViewModel(CreateMockRepo());
		target.identifier('123');
		expect(target.identifier()).toBe('123');
	});
	it('Should not be possible to save an action if a valid person is not choosen', function()
	{
		var target = new ViewModel(CreateMockRepo());
		target.addAction('action');
		expect(target.actions().length).toBe(0);
	});
	it('Must be set an errormessage if addaction fails', function()
	{
		var target = new ViewModel(CreateMockRepo());
		var errorMessage = target.errorMessage();
		target.addAction('action');
		expect(target.errorMessage()).not.toBe(errorMessage);
	});
	it('Should be possible to save an action if valid person is choosen', function()
	{
		var repo = CreateMockRepo();
		var id = AddMockPersonToRepo(repo);
		var target = new ViewModel(repo);
		target.identifier(id);
		target.addAction(new Action(0,'In')); //'action');
		expect(target.actions().length).toBe(1);
		expect(target.actions()[target.actions().length-1].description).toBe('In');
	});
	it('Should be possible to test if an identifier is valid', function(){
		var repo = CreateMockRepo();
		var id = 1; 
		var target = new ViewModel(repo);
		target.identifier(id);
		expect(target.isIdentifierValid()).toBe(false);
		AddMockPersonToRepo(repo,id);
		target.identifier(id);
		expect(target.isIdentifierValid()).toBe(true);
	});
	it('Possible actions', function() {
		var target = new ViewModel(CreateMockRepo());
		//expect(target.possibleActions().length).toBe(4);
		expect(target.layout.actionButtons().length).toBe(4);
	});
	it('Should be possible to retrieve the last action for identifier person', function()
	{
		var repo = CreateMockRepo();
		var id = 1; 
		var target = new ViewModel(repo);
		target.identifier(id);
		AddMockPersonToRepo(repo,id);
		target.identifier(id);
		target.addAction(new Action(0, 'In'));
		target.identifier(id);
		expect(target.lastAction().description).toBe('In');
	});
	it('Should be possible to display error message', function () {
	    target = new ViewModel(CreateMockRepo());
	    target.showErrorMessage('error');
	    expect(target.errorMessage()).toBe('error');
	    setTimeout(function () {
	        expect(target.errorMessage()).toBe('');
	    }, 2000);
	    
	});
	it('Should be possible to clear error message', function() {
		target = new ViewModel(CreateMockRepo());
		target.identifier(0);
		target.addAction(new Action(0,"in"));
		expect(target.errorMessage()).not.toBe('');
		target.clearErrorMessage();
		expect(target.errorMessage()).toBe('');
	});
	it('Should be possible to clear identifier', function() {
		target = new ViewModel(CreateMockRepo());
		target.identifier(0);
		expect(target.identifier()).toBe(0);
		target.clearIdentifier();
		expect(target.identifier()).toBe('');
	});
});


describe("Tests for input", function() {
	it('Should be possible to enter numbers to model', function() {
		var target = new ViewModel(CreateMockRepo());
		var layout = target.layout;
		//target.buttonPress('1');
		layout.addValue('1')
		expect(target.identifier()).toBe('1');
	});
	it('Should be possible to remove last character of identifier', function() {
		var target = new ViewModel(CreateMockRepo());
		var layout = target.layout;
		//target.buttonPress('1');
		layout.addValue('1')
		expect(target.identifier()).toBe('1');
		layout.addValue('2')
		expect(target.identifier()).toBe('12');
		layout.removeLastValue();
		expect(target.identifier()).toBe('1');
	});
	it('Should be possible to clear all values of identifier', function() {
		var target = new ViewModel(CreateMockRepo());
		var layout = target.layout;
		//target.buttonPress('1');
		layout.addValue('1')
		expect(target.identifier()).toBe('1');
		layout.addValue('2')
		expect(target.identifier()).toBe('12');
		layout.clearValues();
		expect(target.identifier()).toBe('');
	});
	it('Should be possible to enter numbers by pressing number buttons', function() {
		var target = new ViewModel(CreateMockRepo());
		var layout = target.layout;
		layout.buttonPress('1');
		expect(target.identifier()).toBe('1');
		layout.buttonPress('2');
		expect(target.identifier()).toBe('12');
	});

});
