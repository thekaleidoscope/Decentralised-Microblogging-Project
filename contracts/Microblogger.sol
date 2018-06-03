pragma solidity ^0.4.17;

contract Microblogger
{


    function Microblogger() public
    {
            msgCount=0;

    }

    /*
    # ------------------------------------------------------------------------------
    # | Memeber Registration and Logging                                           |
    # ------------------------------------------------------------------------------
    */




    struct member
    {
        string  name;
        address  addr;

    }

    mapping (address => bool) public OldMember;
    mapping (address => bytes32) private _key_value;
    mapping (address => member) private _memberDetails;
    mapping (address => bool) private _logged;

    modifier notRegistered()
    {
        assert(!OldMember[msg.sender]);
        _;

    }

    function make_secure(string _pass) internal notRegistered
    {
        bytes memory _arg1 =  bytes(_pass);
        bytes memory _arg2 =  new bytes(20);
        address x=msg.sender;
        for (uint i = 0; i < 20; i++)
            _arg2[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        string memory _temps = new string( _arg1.length + _arg2.length );
        bytes memory _target_s = bytes(_temps);
        uint k=0;
        for(i=0;i<_arg1.length;i++) _target_s[k++]=_arg1[i++];
        for(i=0;i<_arg2.length;i++) _target_s[k++]=_arg2[i++];
        bytes32 _sha256;
        _sha256=keccak256(_target_s);

        _key_value[msg.sender]=_sha256;
    }

    function register(string _name,string keyphrase) public notRegistered
    {
        _memberDetails[msg.sender] = member(_name,msg.sender);
        make_secure(keyphrase);
        OldMember[msg.sender]=true;
    }

    function login(string keyphrase) public
    {
        assert(msg.sender== _memberDetails[msg.sender].addr);

        bytes memory _arg1 =  bytes(keyphrase);
        bytes memory _arg2 =  new bytes(20);
        address x=msg.sender;
        for (uint i = 0; i < 20; i++)
            _arg2[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        string memory _temps = new string( _arg1.length + _arg2.length );
        bytes memory _target_s = bytes(_temps);
        uint k=0;
        for(i=0;i<_arg1.length;i++) _target_s[k++]=_arg1[i++];
        for(i=0;i<_arg2.length;i++) _target_s[k++]=_arg2[i++];
        bytes32 _sha256;
        _sha256=keccak256(_target_s);

        assert(_key_value[msg.sender] == _sha256);

        _logged[msg.sender] = true;

    }



    /*
    # ------------------------------------------------------------------------------
    # | Making Posts                                                                |
    # ------------------------------------------------------------------------------
    */



    //track of counter for posts
    uint public msgCount;

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

    modifier loggedMember()
    {
        assert(OldMember[msg.sender] && _logged[msg.sender]);
        _;
    }

    //Message creation
    function PostMessage(string msgs) public loggedMember
    {
        Messages[msgCount] = Post( msg.sender, msgCount, msgs , now );
        //Increment the msg counter
        msgCount++;
    }


}
