require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");
const {makeTransferProxyAdminOwnership} = require("@openzeppelin/hardhat-upgrades/dist/admin");

describe("WIDEANGLE TESTING", function () {
    before(async function () {
        this.Contract = await ethers.getContractFactory('WIDEANGLE');
    });

    beforeEach(async function () {
        this.testContract = await this.Contract.deploy("Wideangle","WDN","http:/",[1251,1501,1518,1521],[1,1251,1501,1518],["1000000000000000000","2000000000000000000","3000000000000000000","4000000000000000000"],["100000000000000000","200000000000000000","300000000000000000","400000000000000000"],["1000","2000","3000","4000"]);
        await this.testContract.deployed();
        const [owner] = await ethers.getSigners();
        const  ownerWallet = owner.address;


    });

    it("PRIVATE SALE MINT", async function () {
        const [owner] = await ethers.getSigners();
        const  ownerWallet = owner.address;
        const presaleAddresses = await this.testContract.setPrivateSaleAddresses([ownerWallet]);
        const presaleAddresses2 = await this.testContract.switchMintFunction(1);
        const addWhitelist = await this.testContract.addWhitelist([ownerWallet]);
        const payment = await this.testContract.paymentMethod(1);

        for(let i = 0 ; i<312;i++) {
            const ownerMint = await this.testContract.preSaleMint([0, 0, 0, 0], {value: "400000000000000000", from: ownerWallet});
        }
        for(let i = 0 ; i<62;i++) {
            const ownerMint = await this.testContract.preSaleMint([1, 1, 1, 1], {value: "800000000000000000", from: ownerWallet});
        }
        for(let i = 0 ; i<4;i++) {
            const ownerMint = await this.testContract.preSaleMint([2, 2, 2, 2], {value: "1200000000000000000", from: ownerWallet});
        }
        const ownerMint1 = await this.testContract.preSaleMint([1, 1], {value: "400000000000000000", from: ownerWallet});
        const ownerMint2 = await this.testContract.preSaleMint([2], {value: "300000000000000000", from: ownerWallet});
        const ownerMint3 = await this.testContract.preSaleMint([3, 3,3], {value: "1200000000000000000", from: ownerWallet});
        const ownerMint = await this.testContract.preSaleMint([0, 0], {value: "200000000000000000", from: ownerWallet});
        await expect(this.testContract.preSaleMint([0], {value:"100000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.preSaleMint([1], {value:"200000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.preSaleMint([2], {value:"300000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.preSaleMint([3], {value:"400000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.preSaleMint([0,0,1,1,2,2,3,3], {value:"2000000000000000000" })).to.be.revertedWith("Maximum mint count exceeded.");
        await expect(this.testContract.preSaleMint([])).to.be.revertedWith("Wrong category.");
        await expect(this.testContract.preSaleMint([4,5,6])).to.be.revertedWith("Wrong category.");
        const getBalance = await this.testContract.balanceOf(ownerWallet);
        console.log(getBalance);
        const totalSupply = await this.testContract.totalSupply()
        console.log(totalSupply);

    });

    it("PUBLİC SALE MINT", async function () {
        const [owner] = await ethers.getSigners();
        const  ownerWallet = owner.address;
        const switchFunc = await this.testContract.switchMintFunction(2);
        const payment = await this.testContract.paymentMethod(1);

        for(let i = 0 ; i<312;i++) {
            const ownerMint = await this.testContract.publicSaleMint([0, 0, 0, 0], {value: "4000000000000000000", from: ownerWallet});
        }
        for(let i = 0 ; i<62;i++) {
            const ownerMint = await this.testContract.publicSaleMint([1, 1, 1, 1], {value: "8000000000000000000", from: ownerWallet});
        }
        for(let i = 0 ; i<4;i++) {
            const ownerMint = await this.testContract.publicSaleMint([2, 2, 2, 2], {value: "12000000000000000000", from: ownerWallet});
        }
        const ownerMint1 = await this.testContract.publicSaleMint([1, 1], {value: "4000000000000000000", from: ownerWallet});
        const ownerMint2 = await this.testContract.publicSaleMint([2], {value: "3000000000000000000", from: ownerWallet});
        const ownerMint3 = await this.testContract.publicSaleMint([3, 3,3], {value: "12000000000000000000", from: ownerWallet});
        const ownerMint = await this.testContract.publicSaleMint([0, 0], {value: "2000000000000000000", from: ownerWallet});
        await expect(this.testContract.publicSaleMint([0], {value:"1000000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.publicSaleMint([1], {value:"2000000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.publicSaleMint([2], {value:"3000000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.publicSaleMint([3], {value:"4000000000000000000" })).to.be.revertedWith("Exceeds total supply");
        await expect(this.testContract.publicSaleMint([0,0,1,1,2,2,3,3], {value:"20000000000000000000" })).to.be.revertedWith("Maximum mint count exceeded.");
        await expect(this.testContract.publicSaleMint([])).to.be.revertedWith("Wrong category.");
        await expect(this.testContract.publicSaleMint([4,5,6])).to.be.revertedWith("Wrong category.");

        const getBalance = await this.testContract.balanceOf(ownerWallet);
        console.log(getBalance);
        const totalSupply = await this.testContract.totalSupply()
        console.log(totalSupply);

    });
    it("ADD WHITELIST", async function () {
        const [owner] = await ethers.getSigners();
        const  ownerWallet = owner.address;
        const address= [];
        for(let i = 0 ; i<400;i++) {
            const wallet = ethers.Wallet.createRandom().address;
            address.push(wallet);
        }
        const whitelist = await this.testContract.addWhitelist(address);

    });
    it("UPDATE PRİCES", async function () {
        const [owner] = await ethers.getSigners();
        const  ownerWallet = owner.address;
        const switchFunc = await this.testContract.switchMintFunction(2);
        const payment = await this.testContract.paymentMethod(1);
        const publicsaleMint = await this.testContract.publicSaleMint([0, 1, 2, 3], {value: "10000000000000000000", from: ownerWallet});
        const changePrice = await this.testContract.changePublicSaleMintPrice("5000000000000000000","7000000000000000000","9000000000000000000","11000000000000000000");
        const newPRicespublicsaleMint = await this.testContract.publicSaleMint([0, 1, 2, 3], {value: "32000000000000000000", from: ownerWallet}); //NEW PRİCES


    });
    it("OWNER MİNT", async function () {
        const [owner] = await ethers.getSigners();
        const  ownerWallet = owner.address;
        const ownerMint = await this.testContract.ownerMint(1,0);
        const ownerMint2 = await this.testContract.ownerMint(100,0);

    });

});
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
