
var Microblogger = artifacts.require("./Microblogger.sol");

contract("Microblogger", function(accounts)
{

    it("Initial Posts ", function()
    {
        return Microblogger.deployed().then(function(inst)
        {
            return inst.msgCount();
        }).then(function(cnt)

        {
            assert.equal(cnt,0);
        });

    });

    var MemberInst;
    it("Create a Member ", function()
    {
        return Microblogger.deployed().then(function(inst)
        {
            MemberInst=inst;
            MemberInst.register("User1","testval");
        }).then(function()
        {
             return MemberInst.OldMember.call(accounts[0],{from:accounts[0]});

        }).then(function(memb)
        {
            assert.equal(memb,true);
        });
    });

    it("Make a Post", function()
    {
        return Microblogger.deployed().then(function(inst)
        {
            MemberInst=inst;
            MemberInst.login("testval",{from:accounts[0]});
        }).then(function()
        {
            MemberInst.PostMessage("hello",{from:accounts[0]});
        }).then(function()
        {
            return MemberInst.msgCount.call();
        }).then(function(cnt)
        {
            assert.equal(cnt,1);
        });
    });



});
