describe("Memory repo tests", function() {
	it('Should be testable', function() {
		expect(true).toBe(true);
	});
	it('Should possible to add to repo', function() {
		var target = new MemoryRepo();
		target.add('myid','new data');
		expect(target._pendingdata.length).toBe(1);
	});
	it('Should be possible to persist data', function() {
		var target = new MemoryRepo();
		target.add('myid','new data');
		target.save();
		expect(target._pendingdata.length).toBe(0);
		expect(target._data.length).toBe(1);
		expect(target._data[0].data).toBe('new data');
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
});