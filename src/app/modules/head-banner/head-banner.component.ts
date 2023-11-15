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
  networkName: any;
  deposits: any = 0;
  totalAvailable: any = 0;
  connected: boolean = false;
  @Input() contractData: any = [];
  @Output() CurrentchainId = new EventEmitter<string>();

  constructor(private readContractsService: readContractsService, private web3Service: Web3Service) {
    this.web3Service.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })
    this.networkName = localStorage.getItem('networkName');
    this.networkName == null ? this.networkName = "Arbitrum" : "";
  }

  ngOnInit(): void {
    this.readContractsService.data.subscribe((res: any) => {
      this.readContractsService.deposits.subscribe((res: any) => {
        setTimeout(() => {
          this.deposits = res;
        }, (900));
      });
      this.readContractsService.borrows.subscribe((res: any) => {
        setTimeout(() => {
          this.borrows = res;
        }, (900));
      });
      this.readContractsService.totalAvailable.subscribe((res: any) => {
        setTimeout(() => {
          this.totalAvailable = res;
        }, (900));
      });
    })
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