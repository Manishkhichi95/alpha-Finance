import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { readContractsService } from 'src/app/services/readContracts.service';
@Component({
  selector: 'app-head-banner',
  templateUrl: './head-banner.component.html',
  styleUrls: ['./head-banner.component.css']
})
export class HeadBannerComponent implements OnInit, AfterViewInit {
  networkName: any;
  @Output() CurrentchainId = new EventEmitter<string>();
  deposits: any;
  borrows: any;
  totalAvailable: any;

  constructor(private readContractsService: readContractsService) {
    this.networkName = localStorage.getItem('networkName');
    this.networkName == null ? this.networkName = "Arbitrum" : "";
  }
  
  
  ngOnInit(): void {
    this.readContractsService.getTotalDeposits().then((deposits) => {
      // Use the 'deposits' value here or perform further operations
     this.deposits= deposits;
    });
    const borrows: any = localStorage.getItem('borrows');
    // const deposits: any = localStorage.getItem('deposits');
    const totalAvailable: any = localStorage.getItem('totalAvailable');
    this.borrows = JSON.parse(borrows);
    // this.deposits = JSON.parse(deposits);
    this.totalAvailable = JSON.parse(totalAvailable);
  }
  
  ngAfterViewInit(): void {
    console.log(this.readContractsService.getTotalDeposits())
    this.readContractsService.dropDown();
  }

  async switchNetwork(network: string) {
    const provider = window.ethereum;
    let chainId = '';
    network == 'Arbitrum' ? chainId = '0xa4b1' : network == 'Polygon Mainnet' ? chainId = '0x89' : chainId = '0x13881';
    console.log(chainId)
    if (!provider) {
      console.log("Metamask is not installed, please install!");
    } else {
      const CurrentchainId = await provider.request({ method: 'eth_chainId' });
      localStorage.setItem('chainId', CurrentchainId)
      if (chainId === CurrentchainId) {
        console.log("You are on the correct network");
      } else {

        console.log("Switch to the correct network");
        try {

          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }],
          });
          const latestchainId = await provider.request({ method: 'eth_chainId' });
          this.CurrentchainId.emit(latestchainId);
          console.log("You have succefully switched to ", network, "Test network");
          this.networkName = network;
          localStorage.setItem('networkName', network);
        } catch (switchError: any) {
          if (switchError.code === 4001) {
            CurrentchainId == '0xa4b1' ? this.networkName = 'Arbitrum' : CurrentchainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Polygon Testnet';
            const getElement: any = document.getElementById('destination');
            getElement.innerHTML = this.networkName;
            localStorage.setItem('networkName', this.networkName);
          }
          if (switchError.code === 4902) {
            console.log("This network is not available in your metamask, please add it")
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: chainId,
                  }],
              });
            } catch (addError) {
              console.log(addError);
            }
          }
        }
      }
    }
  }
}