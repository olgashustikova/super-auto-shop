# SHUPER AUTO SHOP PROJECT

That project allows user to see used car ads.
The user can sing-up, create ads, send messages to other user

## Users handling

The users handling is done through basic auth. When user sign-up I save password as a hash and username in the mongo.

When user try to login I send a request header to the server with username and password.
If the request is succes I save username and password to the context and use them to access restricted endpoints like chats or delete ads.

## External API

I use cloudinary to save images and opencage to veryfy user address

## Link to video

[Here is the link to the youtube video](https://youtu.be/u5ygcLjedRs)
