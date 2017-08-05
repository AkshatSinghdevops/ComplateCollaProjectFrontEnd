/**
 * 
 */

var myApp = angular.module("myApp",['ngRoute', 'ngCookies'])
myApp.config(function($routeProvider){
   
	console.log('Entering In Config file myApp ')
	
	$routeProvider
	.when ('/home',{
		templateUrl:'view/home.html'
	})
	.when('/login',{
		controller:'UserController',
		templateUrl:'view/login.html'
	})
	.when('/profile',{
		templateUrl:'view/profile.html'
	})
	.when('/blog',{
		templateUrl:'blog/Blog.html'
	})
	.when('/register',{
		templateUrl:'view/register.html'
	})
	.otherwise('/home',{
		templateUrl:'view/home.html'
	})
	
})

myApp.run(function($cookieStore, $rootScope, $location, UserService, $http) {
	$rootScope.logout = function() {
		console.log('logout()')
		$rootScope.currentUser = {};
		//delete $rootScope.currentUser;
		$cookieStore.remove('currentUser')
		UserService.logout().then(function(response) {
			console.log("Logged out successfully..");
			$rootScope.message = "Logged out Successfully !";
			$location.path('/login')
		}, function(response) {
			console.log(response.status);
		})
	}

	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		console.log("$locationChangeStart")
		// http://localhost:8080/Collaboration/addjob
		// redirect to login page if not logged in and trying to access a
		// restricted page

		var userPages = [ '/users', '/blog-create', '/job', '/profile',
				'/myBlog', '/viewFriendRequest', '/chat' ]
		var adminPages = [ "/blog-manage", "/job-manage", "/create_job" ]

		var currentPage = $location.path()

		// will return 0 if current page is there in list
		// else return -1
		var isUserPage = $.inArray(currentPage, userPages)
		var isAdminPage = $.inArray(currentPage, adminPages)

		var isLoggedIn = $rootScope.currentUser.id;

		console.log("isLoggedIn:" + isLoggedIn)
		console.log("isUserPage:" + isUserPage)
		console.log("isAdminPage:" + isAdminPage)

		if (!isLoggedIn) {
			console.log('Anonimous User Page Validation')
			if (isUserPage >= 0 || isAdminPage >= 0) {
				console.log("Navigating to login page:")
				alert("You need to loggin to do this operation")

				$location.path('/home');
			}
		}

		else // logged in
		{
			console.log('Enter in to logged in user Page Validation')

			var role = $rootScope.currentUser.role;

			if (isAdminPage >= 0 && role != 'admin') {

				alert("You can not do this operation as you are logged as : "
						+ role)
				$location.path('/home');

			}

		}

	});

	// keep user logged in after page refresh
	$rootScope.currentUser = $cookieStore.get('currentUser') || {};
	if ($rootScope.currentUser) {
		$http.defaults.headers.common['Authorization'] = 'Basic'
				+ $rootScope.currentUser;
	}
})


