function MemoryRepo () {
	var _pendingdata = [];
	var _data = [];

	this.add = function(id, data){
		toAdd = { 'id': id, 'data' : data};
		_pendingdata.push(toAdd);
	};

	this.save = function(){
		_data.push.apply(_data, _pendingdata);
		_pendingdata = [];
	};

	this.getById = function(id){
		for (var i = _data.length - 1; i >= 0; i--) {
			if (_data[i].id==id)
				return _data[i].data;
		}; 
		return null;
	};

	this.getAll = function() {
		return _data;
	}
}

Person = function(id, name)
{
	return {"id" : id, "name" : name, "actions": []};
}

MockDataCreator = function(repo)
{
	repo.add(1, new Person(1,"Nils Nilsson"));
	repo.save();
};