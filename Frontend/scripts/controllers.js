app.controller('LoginController', function ($scope, $location) {
  $scope.login = function (user) {
    if (user.role === 'admin' && user.username === 'admin' && user.password === 'admin123') {
      alert('Admin login successful!');
      $location.path('/index'); // Redirect to the home page
    } else if (user.role === 'customer' && user.username && user.password) {
      alert('Customer login successful!');
      $location.path('/index'); // Redirect to the home page
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
});