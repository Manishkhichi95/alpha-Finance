import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-head-banner',
  templateUrl: './head-banner.component.html',
  styleUrls: ['./head-banner.component.css']
})
export class HeadBannerComponent implements OnInit, AfterViewInit {
  borrows: Number = 0;
  networkName: any;
  deposits: Number = 0;
  totalAvailable: Number = 0;
  connected: boolean = false;
  @Input() contractData: any = [];
  @Output() CurrentchainId = new EventEmitter<string>();

  constructor(private readContractsService: readContractsService, private web3Service: Web3Service) {
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })
    this.networkName = localStorage.getItem('networkName');
    this.networkName == null ? this.networkName = "Mumbai Testnet" : "";
  }

  ngOnInit(): void {
    localStorage.getItem('borrows');
    localStorage.getItem('deposits');
    localStorage.getItem('totalAvailable');
    debugger
    // this.readContractsService.getReserveData().subscribe((res: any) => {
      this.readContractsService.deposits.subscribe((res: Number) => {
          this.deposits = res;
          const deposits: any = localStorage.getItem('deposits')
          this.deposits == 0 ? this.deposits = JSON.parse(deposits) : '';
      });
      this.readContractsService.borrows.subscribe((res: Number) => {
          this.borrows = res;
          const borrows: any = localStorage.getItem('borrows')
          this.borrows == 0 ? this.borrows = JSON.parse(borrows) : '';
      });
      this.readContractsService.totalAvailable.subscribe((res: Number) => {
          this.totalAvailable = res;
          const totalAvailable: any = localStorage.getItem('totalAvailable')
          this.totalAvailable == 0 ? this.totalAvailable = JSON.parse(totalAvailable) : '';
      });
    // })
  }

  ngAfterViewInit(): void {
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
          localStorage.setItem('chainId', latestchainId)
          console.log(latestchainId)
          this.CurrentchainId.emit(latestchainId);
          console.log("You have succefully switched to ", network, "Test network");
          this.networkName = network;
          localStorage.setItem('networkName', network);
        } catch (switchError: any) {
          if (switchError.code === 4001) {
            CurrentchainId == '0xa4b1' ? this.networkName = 'Arbitrum' : CurrentchainId == '0x89' ? this.networkName = 'Polygon Mainnet' : this.networkName = 'Mumbai Testnet';
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