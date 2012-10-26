Albums = new Meteor.Collection("albums");
Playlist = new Meteor.Collection("playlist");

var audio = new Audio;

if (Meteor.isClient) {
	console.log("CLIENT");

}