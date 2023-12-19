import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.css']
})
export class BridgeComponent {
  web3: any;
  Form: any;
  amount: any;
  chainId = '';
  CurrentchainId: any;
  transactionType: any;
  showError: boolean = false;
  showSpinner: boolean = false;
  networkName: any = 'Select Network';
  CHAIN_ID: any = require("../../../assets/json/chainIds.json");
  fees: any = '0.0';
  alphaAdd: any;
  alphaOFTABI: any;
  localContractInstance: any;
  balance: any;
  walletAddress:any = localStorage.getItem('walletAddress');

  constructor(private getWeb3: Web3Service, private http: HttpClient, private readContractsService: readContractsService, private fb: FormBuilder) {
    this.web3 = this.getWeb3.getWeb3();
  }

  ngOnInit() {
    this.Form = this.fb.group({
      DstAddress: ['', Validators.required]
    })
    this.getBalance();
    const data: any = require('../../../assets/json/ABIs&Addresses.json');
    this.alphaAdd = data.alphaOFTAdd;
    this. alphaOFTABI = data.alphaOFTABI;
    this. localContractInstance = new this.web3.eth.Contract(this.alphaOFTABI, this.alphaAdd);
  }

  ngAfterViewInit(): void {
    this.readContractsService.dropDown();
  }

  async getBalance(){
    const balance = await this.web3.eth.getBalance(this.walletAddress);
    this.balance = (Number(balance) / Math.pow(10, 18)).toFixed(2);
  }

  isInvalid(controlName: string): any {
    const control = this.Form.get(controlName);
    return control?.touched && control?.invalid;
  }

  openDialog() {
    console.log('chainId && amount', this.amount, this.chainId)
    if (this.chainId == '' && this.amount == undefined) {
      Swal.fire({
        title: "Please Fill the Required Fields",
        icon: "warning"
      }).then((result: any) => {
      })
      return
    }
    else if (this.chainId == '') {
      Swal.fire({
        title: "Please Select the Destination Network",
        icon: "warning"
      }).then((result: any) => {
      })
      return
    }
    else if (this.amount == undefined) {
      Swal.fire({
        title: "Please Enter the Amount to Send",
        icon: "warning"
      }).then((result: any) => {
      })
      return
    }
    else if (this.chainId != '' && this.amount != undefined) {
      const element: any = document.getElementById("myModal");
      element.style.display = "block";
    }
  }

  closeDialog() {
    const element: any = document.getElementById("myModal");
    element.style.display = "none";
  }

  async switchNetwork(network: string) {
    network == 'Arbitrum' ? this.chainId = this.CHAIN_ID["arbitrum-goerli"] : network == 'Polygon Mainnet' ? this.chainId = '0x89' : network == 'Mumbai Testnet' ? this.chainId = '0x13881' : network == 'Select Network' ? this.chainId = '' : '';
    this.networkName = network;
    localStorage.setItem('networkName', this.networkName)
    console.log('switchNetwork', network, this.chainId)
    const fees = await this.localContractInstance.methods.estimateSendFee(this.chainId, "0xf01ACd54082dD7A0180a0bF74e38179b7012DF7c", "1", false, [])
    .call();
    this.fees = fees[0];
  }

  async sendFrom() {
    if (this.Form.get('DstAddress')?.value == '') {
      this.showError = true;
      return
    }
    this.showSpinner = true;
    console.log(this.fees[0])
    try {
      let sendFrom = await this.localContractInstance.methods.sendFrom(
        this.walletAddress,
        this.chainId,
        this.Form.get('DstAddress')?.value,
        this.amount,
        this.walletAddress,
        "0x0000000000000000000000000000000000000000",
        []
      ).send({
        from: "0xf01ACd54082dD7A0180a0bF74e38179b7012DF7c",
        value: this.fees[0],
        data: this.localContractInstance.methods.sendFrom(
          this.walletAddress,
          this.chainId,
          this.Form.get('DstAddress')?.value,
          this.amount,
          this.walletAddress,
          "0x0000000000000000000000000000000000000000",
          []
        ).encodeABI(),
        gas: 1000000
      })
      const receipt = await this.web3.eth.getTransactionReceipt(sendFrom.transactionHash);
      if (receipt && receipt.status) {
        this.showSpinner = false;
        this.Form.reset();
        this.amount == '';
        Swal.fire({
          title: "Transaction Successful",
          icon: "success",
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.Form.reset();
            this.amount == '';
          }
        });
        console.log('Transaction succeeded!');
      }
    } catch (error: any) {
      const err = JSON.stringify(error);
      const innerErr = JSON.parse(err);
      console.error('Error:', innerErr);
      this.showSpinner = false;
      this.Form.reset();
      this.amount == '';
      if (innerErr.innerError) {
        if (innerErr.innerError.code === 4001) {
          Swal.fire({
            title: "Transaction Rejected",
            text: "Please approve the transaction in Metamask.",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: 'Unknown error occurred',
            icon: "error",
          });
        }
      }
      else {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      }
    }
    this.showSpinner = false;
    this.Form.reset();
    this.amount == '';
    this.Form.reset();
  }
}