function HomeCtrl($scope,$rootScope,$routeParams,$location,$timeout) {
	// Meteor.subscribe("albums");
	// Meteor.subscribe("player");
	Meteor.autosubscribe(function () {
		Meteor.subscribe("playlist", {
			currentAlb: Session.get("current_album")
		});
	});
	$scope.Albums = new Meteor.AngularCollection("albums", $scope);
	$scope.albums = $scope.Albums.find({});
	
	$scope.Playlist = new Meteor.AngularCollection("playlist", $scope);
	$scope.playlist = $scope.Playlist.findOne({});
	
	$scope.player = {};
	$scope.player.current_album = 0;
	$scope.player.current_track = 0;
	$scope.player.playing = false;
	
	$scope.playlist.add = function(album) {
		console.log("Adding album");
		if ($scope.playlist.indexOf(album) != -1) return;
		$scope.playlist.push(album);
		console.log($scope.playlist.length);
		$scope.playlist.$save();
	};
	
	$scope.play = function(track, album) {
		console.log("PLAYING");
		if (!$scope.playlist.length) return;
		if (angular.isDefined(track)) $scope.player.current_track = track;
		if (angular.isDefined(album))	$scope.player.current_album = album;
		console.log(audio.src);
		console.log($scope.player.current_track);
		console.log($scope.playlist);

		var url =  $scope.playlist[$scope.player.current_album].tracks[$scope.player.current_track].url;
		console.log("URL");
		console.log(url);
		
    if (true) audio.src = url;
		console.log(audio.src);
    audio.play();
		$scope.player.playing = true;
	}
	
	$scope.pause = function() {
		if ($scope.player.playing) {
			audio.pause();
			$scope.player.playing = false;
		}
	}
	
	$scope.reset = function() {
		console.log("Reset");
		$scope.pause();
		$scope.player.current_album = 0;
		$scope.player.current_track = 0;
	}
	
	$scope.previous = function() {
		  if (!$scope.playlist.length) return;
      $scope.player.playing = true;
      if ($scope.player.current_track > 0) {
        $scope.player.current_track--;
      } else {
        $scope.player.current_album = ($scope.player.current_album - 1 + $scope.playlist.length) % $scope.playlist.length;
        $scope.player.current_track = $scope.playlist[$scope.player.current_album].tracks.length - 1;
      }
      if ($scope.player.playing) $scope.play();
    }
	
	$scope.next = function() {
		if (!$scope.playlist.length) return;
    $scope.player.playing = true;
    if ($scope.playlist[$scope.player.current_album].tracks.length > ($scope.player.current_track + 1)) {
	console.log("Fir");
      $scope.player.current_track = $scope.player.current_track + 1;
    } else {
	console.log("peeb");
      $scope.player.current_track = 0;
      $scope.player.current_album = ($scope.player.current_album + 1) % $scope.playlist.length;
    }
    if ($scope.player.playing) $scope.play();
	}
	
	$scope.playlist.remove = function(album) {
		var index = $scope.playlist.indexOf(album);
		var pl_num = index + 1;
		if (pl_num == $scope.player.current_album + 1) $scope.reset();
		$scope.playlist.splice(index, 1);
	};
	
}