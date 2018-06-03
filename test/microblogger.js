
var Microblogger = artifacts.require("./Microblogger.sol");

contract("Microblogger", function(accounts)
{

    it("Create Posts ", function()
    {
        return Microblogger.deployed().then(function(inst)
        {
            return inst.msgCount();
        }).then(function(cnt)

        {
            assert.equal(cnt,0);
        });

    });
});
