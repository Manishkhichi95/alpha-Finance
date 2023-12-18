import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.css']
})
export class BridgeComponent {
  web3: any;
  Form: any;
  showError: boolean = false;
  transactionType: any
  showSpinner!: boolean;
  CurrentchainId: any;
  chainId = '';
  networkName: any = localStorage.getItem('networkName');
  amount: any;
  constructor(private getWeb3: Web3Service, private http: HttpClient, private readContractsService: readContractsService, private fb: FormBuilder) {
    this.web3 = this.getWeb3.getWeb3();
  }

  openDialog() {
    const element: any = document.getElementById("myModal");
    element.style.display = "block";
  }

  isInvalid(controlName: string): any {
    const control = this.Form.get(controlName);
    return control?.touched && control?.invalid;
  }

  closeDialog() {
    const element: any = document.getElementById("myModal");
    element.style.display = "none";
  }

  ngOnInit() {
    this.Form = this.fb.group({
      DstAddress: ['', Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.readContractsService.dropDown();
  }

  async switchNetwork(network: string) {
    const provider = window.ethereum;
    network == 'Arbitrum' ? this.chainId = '0xa4b1' : network == 'Polygon Mainnet' ? this.chainId = '0x89' : network == 'Mumbai Testnet' ? this.chainId = '0x13881' : this.chainId = '';
    console.log(this.chainId)
  }

  CHAIN_ID = require("../../../assets/json/chainIds.json");

  async sendFrom() {
    let walletadress = localStorage.getItem('walletAddress');
    const data: any = require('../../../assets/json/ABIs&Addresses.json');
    const alphaAdd = data.alphaOFTAdd;
    const alphaOFTABI = data.alphaOFTABI;
    const remoteChainId = this.CHAIN_ID["arbitrum-goerli"]

    const localContractInstance: any = new this.web3.eth.Contract(alphaOFTABI, alphaAdd);


    let fees = await localContractInstance.methods.estimateSendFee(remoteChainId, "0xf01ACd54082dD7A0180a0bF74e38179b7012DF7c", "1", false, [])
      .call();
    console.log(fees[0])
    let sendFrom = await localContractInstance.methods.sendFrom(
      walletadress,
      remoteChainId,
      this.Form.get('DstAddress')?.value,
      this.amount,
      walletadress,
      "0x0000000000000000000000000000000000000000",
      []
    )
      .send({
        from: "0xf01ACd54082dD7A0180a0bF74e38179b7012DF7c",
        value: fees[0],
        data: localContractInstance.methods.sendFrom(
          walletadress,
          remoteChainId,
          this.Form.get('DstAddress')?.value,
          this.amount,
          walletadress,
          "0x0000000000000000000000000000000000000000",
          []
        ).encodeABI(),
        gas: 1000000
      })
    console.log(` tx: ${sendFrom.transactionHash}`)
    console.log(`* check your address [${"0xf01ACd54082dD7A0180a0bF74e38179b7012DF7c"}] on the destination chain, in the ERC20 transaction tab !"`)
  }
}