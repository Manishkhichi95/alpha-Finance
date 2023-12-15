import { Web3Service } from 'src/app/services/WEb3Service.service';
import { readContractsService } from 'src/app/services/readContracts.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-head-banner',
  templateUrl: './head-banner.component.html',
  styleUrls: ['./head-banner.component.css']
})
export class HeadBannerComponent implements OnInit, AfterViewInit {
  borrows: any = 0;
  networkName: any = localStorage.getItem('networkName');
  deposits: any = 0;
  totalAvailable: any = 0;
  connected: boolean = false;
  @Input() contractData: any = [];
  @Output() CurrentchainId = new EventEmitter<string>();
  web3: any;
  finalDepo: any;
  finalBrow: any;
  finalttlAvlble: any;

  constructor(private readContractsService: readContractsService, private web3Service: Web3Service) {
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })
    this.checkNetworkId();
  }

  async checkNetworkId() {
    this.web3 = this.web3Service.getWeb3();
    const CurrentchainId = await this.web3.eth.net.getId();
    console.log(CurrentchainId)
    if (CurrentchainId == 80001n) {
      this.networkName = 'Mumbai Testnet';
    }
    if (CurrentchainId == 42161n) {
      this.networkName = 'Arbitrum';
    }
    if (CurrentchainId == 137n) {
      this.networkName = 'Polygon Mainnet';
    }
       else if(CurrentchainId!=42161n && CurrentchainId != 137n && CurrentchainId !=80001n) {
      this.networkName = 'Select Network';
    }
  }

  ngOnInit(): void {
    localStorage.getItem('borrows');
    localStorage.getItem('deposits');
    localStorage.getItem('totalAvailable');
    debugger
    this.readContractsService.deposits.subscribe((res: Number) => {
      this.deposits = res;
      const deposits: any = localStorage.getItem('deposits')
      this.deposits == 0 ? this.deposits = JSON.parse(deposits) : '';
      if (this.deposits.toString().length == 1 || this.deposits.toString().length == 2 ||this.deposits.toString().length == 3) {
        this.finalDepo = this.deposits;
      }
      if (this.deposits.toString().length == 4 || this.deposits.toString().length == 5 || this.deposits.toString().length == 6 ) {
       console.log(this.deposits)
        this.finalDepo = (this.deposits / 1000) + 'k';
      }
      if ( this.deposits.toString().length == 7 || this.deposits.toString().length == 8) {
        this.finalDepo = (this.deposits / 1000000) + 'M';
      }
      if (this.deposits.toString().length > 9) {
        this.finalDepo = (this.deposits / 1000000000) + 'B';
      }
    });
    this.readContractsService.borrows.subscribe((res: Number) => {
      this.borrows = res;
      const borrows: any = localStorage.getItem('borrows')
      this.borrows == 0 ? this.borrows = JSON.parse(borrows) : '';
      if (this.borrows.toString().length == 1 || this.borrows.toString().length == 2 || this.borrows.toString().length == 3) {
        this.finalBrow = this.borrows;
      }
      if (this.borrows.toString().length == 4 || this.borrows.toString().length == 5 || this.borrows.toString().length == 6) {
        this.finalBrow = (this.borrows / 1000) + 'k';
      }
      if (this.borrows.toString().length == 7 || this.borrows.toString().length == 8) {
        this.finalBrow = (this.borrows / 1000000) + 'M';
      }
      if (this.borrows.toString().length > 9) {
        this.finalBrow = (this.borrows / 1000000000) + 'B';
      }
    });

    this.readContractsService.totalAvailable.subscribe((res: Number) => {
      this.totalAvailable = res;
      const totalAvailable: any = localStorage.getItem('totalAvailable')
      this.totalAvailable == 0 ? this.totalAvailable = JSON.parse(totalAvailable) : '';
      const fixedtotalAvailable =Math.floor(this.totalAvailable) ;
      console.log('fixedtotalAvailable',fixedtotalAvailable)

      if (fixedtotalAvailable.toString().length == 1 || fixedtotalAvailable.toString().length == 2 || fixedtotalAvailable.toString().length == 3) {
        this.finalttlAvlble = fixedtotalAvailable;
      }
      if (fixedtotalAvailable.toString().length == 4 || fixedtotalAvailable.toString().length == 5 ||fixedtotalAvailable.toString().length == 6 ) {
        this.finalttlAvlble = (fixedtotalAvailable / 1000) + 'k';
      }
      if (fixedtotalAvailable.toString().length == 7 || fixedtotalAvailable.toString().length == 8) {
        this.finalttlAvlble = (fixedtotalAvailable / 1000000) + 'M';
      }
      if (fixedtotalAvailable.toString().length > 9) {
        this.finalttlAvlble = (fixedtotalAvailable / 1000000000) + 'B';
      }
    });
  }

  ngAfterViewInit(): void {
    this.readContractsService.dropDown();
  }

  async switchNetwork(network: string) {
    const provider = window.ethereum;
    let chainId = '';
    network == 'Arbitrum' ? chainId = '0xa4b1' : network == 'Polygon Mainnet' ? chainId = '0x89' : network == 'Mumbai Testnet' ? chainId = '0x13881' : chainId = '';
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