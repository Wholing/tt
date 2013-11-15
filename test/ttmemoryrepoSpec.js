describe("Memory repo tests", function() {
	it('Should be testable', function() {
		expect(true).toBe(true);
	});
	it('Should possible to add to repo', function() {
		var target = new MemoryRepo();
		target.add('myid','new data');
		expect(target.getAll().length).toBe(0);
		//expect(target._pendingdata.length).toBe(1);
	});
	it('Should be possible to persist data', function() {
		var target = new MemoryRepo();
		target.add('myid','new data');
		target.save();
		//expect(target._pendingdata.length).toBe(0);
		expect(target.getAll().length).toBe(1);
		expect(target.getAll()[0].data).toBe('new data');
	});
	it('should be possible to get item by id', function() {
		var target = new MemoryRepo();
		target.add('myid','new data');
		var item = target.getById('myid');
		expect(item).toBe(null);
		target.save();
		var item = target.getById('myid');
		expect(item).toBe('new data');
	});
	it('should be possible to get item by id int and id string as equals', function() {
		target = new MemoryRepo();
		target.add(1, 'some data');
		target.save();
		var item = target.getById(1);
		expect(item).toBe('some data');
		var itembystring = target.getById("1");
		expect(itembystring).toBe('some data');	
	});
});