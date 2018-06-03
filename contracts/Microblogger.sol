pragma solidity ^0.4.17;

contract Microblogger
{
    //track of counter for posts
    uint public msgCount;

    function Microblogger() public
    {
            msgCount=0;
    }

    //Model of a Post
    struct Post
    {
        address owner;
        uint id;
        string data;
        uint created;
    }

    //Holds the post as a map to the counter.
    mapping (uint => Post ) public Messages;

    //Message creation
    function PostMessage(string msgs) public
    {
        Messages[msgCount] = Post( msg.sender, msgCount, msgs , now );
        //Increment the msg counter
        msgCount++;
    }

    
}
