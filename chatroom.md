# Chatrooms

On the left side, there are many different chatrooms, for example **main** and others that can be created by users.

When a chatroom is opened, the most recent messages get fetched and shown. A SSE is registered so that more can be
received. When another room is opened, the old one still stays loaded and continues to receive data. This may stop with
a timeout after not opening it for some time.