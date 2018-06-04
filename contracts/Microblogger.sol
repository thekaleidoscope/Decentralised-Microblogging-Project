pragma solidity ^0.4.17;

contract timehelper
{
    uint constant SECONDS_PER_DAY = 24 * 60 * 60;
    uint constant SECONDS_PER_HOUR = 60 * 60;
    uint constant SECONDS_PER_MINUTE = 60;
    int constant OFFSET19700101 = 2440588;

    uint constant DOW_MON = 1;
    uint constant DOW_TUE = 2;
    uint constant DOW_WED = 3;
    uint constant DOW_THU = 4;
    uint constant DOW_FRI = 5;
    uint constant DOW_SAT = 6;
    uint constant DOW_SUN = 7;

    function _daysToDate(uint _days) internal pure returns (uint year, uint month, uint day)
    {
        int __days = int(_days);

        int L = __days + 68569 + OFFSET19700101;
        int N = 4 * L / 146097;
        L = L - (146097 * N + 3) / 4;
        int _year = 4000 * (L + 1) / 1461001;
        L = L - 1461 * _year / 4 + 31;
        int _month = 80 * L / 2447;
        int _day = L - 2447 * _month / 80;
        L = _month / 11;
        _month = _month + 2 - 12 * L;
        _year = 100 * (N - 49) + _year + L;

        year = uint(_year);
        month = uint(_month);
        day = uint(_day);
    }

    function timestampToDateTime(uint timestamp) internal pure returns (uint year, uint month, uint day, uint hour, uint minute, uint second) {
        (year, month, day) = _daysToDate(timestamp / SECONDS_PER_DAY);
        uint secs = timestamp % SECONDS_PER_DAY;
        hour = secs / SECONDS_PER_HOUR;
        secs = secs % SECONDS_PER_HOUR;
        minute = secs / SECONDS_PER_MINUTE;
        second = secs % SECONDS_PER_MINUTE;
    }



}
contract Microblogger is timehelper
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
        uint year; uint month; uint day; uint hour; uint minute; uint second;
        string username;
    }

    //Holds the post as a map to the counter.
    mapping (uint => Post ) public Messages;

    event NewPost();

    modifier loggedMember()
    {
        assert(OldMember[msg.sender] && _logged[msg.sender]);
        _;
    }

    //Message creation
    function PostMessage(string msgs) public loggedMember
    {   uint year; uint month; uint day; uint hour; uint minute; uint second;
        (year, month, day, hour, minute , second) = timestampToDateTime(now);
        Messages[msgCount] = Post(msg.sender,msgCount, msgs , year, month, day,hour,minute,second,_memberDetails[msg.sender].name );
        //Increment the msg counter
        msgCount++;
        NewPost();
    }
    function logout() public
    {
        _logged[msg.sender] = false;

    }


}
