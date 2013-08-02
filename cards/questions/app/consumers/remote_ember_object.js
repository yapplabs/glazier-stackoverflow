var remoteEmberObjectConsumer =  {
  updateData: function(bucketName, data) {
    this.send('updateData', { bucket: bucketName, data: data });
  },
  requests: {
    getBucketData: function(bucketName) {
      if (this.controllers.indexOf(bucketName) === -1) {
        throw new Error('Invalid bucket name ' + bucketName);
      } else {
        // FUTURE: maybe have the bucket-backing objects registered as bucket: types
        var controller = this.container.lookup('controller:' + bucketName);
        return controller.getBucketData();
      }
    }
  }
};

export default remoteEmberObjectConsumer;
