var MemoryRepo = function() {
	var self = this;
	self._pendingdata = [];
	self._data = [];

	self.add = function(id, data){
		toAdd = { 'id': id, 'data' : data};
		self._pendingdata.push(toAdd);
	};

	self.save = function(){
		self._data.push.apply(self._data, self._pendingdata);
		self._pendingdata = [];
	};

	self.getById = function(id){
		for (var i = self._data.length - 1; i >= 0; i--) {
			if (self._data[i].id===id)
				return self._data[i].data;
		}; 
		return null;
	};

}