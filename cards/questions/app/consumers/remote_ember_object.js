var deferred = Conductor.Oasis.RSVP.defer();

var RemoteEmberObjectConsumer =  {
  activate: function(){
    deferred.resolve();
  },
  updateData: function(bucketName, data) {
    this.send('updateData', { bucket: bucketName, data: data });
  },
  requests: {
    getBucketData: function(bucketName) {
      var consumer = this;
      return deferred.promise.then(function(){
        if (consumer.controllers.indexOf(bucketName) === -1) {
          throw new Error('Invalid bucket name ' + bucketName);
        } else {
          // FUTURE: maybe have the bucket-backing objects registered as bucket: types
          var controller = consumer.container.lookup('controller:' + bucketName);
          return controller.getBucketData();
        }
      }).then(null, Conductor.error);
    }
  }
};

export default RemoteEmberObjectConsumer;
