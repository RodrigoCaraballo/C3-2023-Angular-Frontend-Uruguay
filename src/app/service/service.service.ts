import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignUpModel } from '../interfaces/sign-up.interface';
import { SignInModel, SignInGoogleModel } from '../interfaces/sign-in.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerModel } from '../interfaces/customer.interface';
import { AccountModel } from '../interfaces/account.model';
import { CreateDepositModel } from '../interfaces/create-deposit.model';
import { DepositModel } from '../interfaces/deposit.model';
import { CreateTransferModel } from '../interfaces/create-transfer.dto';
import { TransferModel } from '../interfaces/transfer.model';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { PaginationAndDataRange } from '../interfaces/pagination.model';
import { UpdateCustomerModel } from '../interfaces/update-customer.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient,
    private router: Router,
    private authgoogle: Auth) { }

    // AuthService

  signUp (customer: SignUpModel) {
  this.http.post(`${environment.apiBase}/security/signUp`, customer, {responseType: 'text'})
  .subscribe(resp => sessionStorage.setItem('jwt', resp));

  }

  signIn (customer: SignInModel) {
    this.http.post(`${environment.apiBase}/security/signIn`, customer, {responseType: 'text'})
    .subscribe(resp => sessionStorage.setItem('jwt', resp));

  }

  loginGoogle (customer: SignInGoogleModel) {
    this.http.post(`${environment.apiBase}/security/signInGoogle`, customer, {responseType: 'text'})
    .subscribe(resp => sessionStorage.setItem('jwt', resp));

  }

  signInGoogle() {
    return signInWithPopup(this.authgoogle, new GoogleAuthProvider());
  }

  signOut () {
    const token = sessionStorage.getItem('jwt')

    this.http.post<boolean>(`${environment.apiBase}/security/signOut/`, {token: token})
    .subscribe(resp => {
      if(resp) {
        sessionStorage.removeItem('jwt')
      }
    })
  }

  //Customer Service
  helper = new JwtHelperService();

  hasUser(): boolean {
    if(sessionStorage.getItem('jwt')) {
      return true
    }

    return false;
  }


  getUserFromLocalStorage() {
    const token = sessionStorage.getItem('jwt')

    if(token != null) {
      return this.helper.decodeToken(token);
    }
  }

  getCustomerInfo() {
    const user = this.getUserFromLocalStorage();

    return this.http.get<CustomerModel>(`${environment.apiBase}/customer/find/${user.id}`)
  }

  checkEmail(email: string) {
    return this.http.get<boolean>(`${environment.apiBase}/customer/check-email/${email}`)
  }

  updateCustomer(customer: UpdateCustomerModel) {
    const user = this.getUserFromLocalStorage();

    this.http.put(`${environment.apiBase}/customer/update/${user.id}`, customer)
    .subscribe()
  }

  //Account Service

  findAccount(id: string) {
    return this.http.get<AccountModel>(`${environment.apiBase}/account/find/${id}`)
  }

  getAccounts() {
    const user = this.getUserFromLocalStorage();

    return this.http.get<AccountModel[]>(`${environment.apiBase}/account/find-by-customer/${user.id}`)
  }

  createSavingAccount() {
    const user = this.getUserFromLocalStorage()

    return this.http.post<AccountModel>(`${environment.apiBase}/account/create-additional-saving-account`, {customerId: user.id})
  }

  createCheckingAccount() {
    const user = this.getUserFromLocalStorage()

    return this.http.post<AccountModel>(`${environment.apiBase}/account/create-additional-checking-account`, {customerId: user.id})
  }

  changeAccountType(id: string) {
    this.http.patch<AccountModel>(`${environment.apiBase}/account/change-account-type/${id}`, null)
    .subscribe()
  }

  deleteAccount(id: string) {
    this.http.delete(`${environment.apiBase}/account/soft-delete/${id}`)
    .subscribe()
  }

  //Deposit Service

  createDeposit(deposit: CreateDepositModel) {
    this.http.post<CreateDepositModel>(`${environment.apiBase}/deposit/create`, deposit)
    .subscribe();
  }

  getDepositHistory(id: string, data: PaginationAndDataRange) {
    return this.http.post<DepositModel[]>(`${environment.apiBase}/deposit/get-history/${id}`, data)
  }

  //Transfer Service

  createTransfer(transfer: CreateTransferModel) {
    this.http.post(`${environment.apiBase}/transfer/create`, transfer)
    .subscribe()
  }

  getIncomes(id: string, data: PaginationAndDataRange) {
    return this.http.post<TransferModel[]>(`${environment.apiBase}/transfer/get-history-in/${id}`, data)
  }

  getOutcomes(id: string, data: PaginationAndDataRange) {
    return this.http.post<TransferModel[]>(`${environment.apiBase}/transfer/get-history-out/${id}`, data)
  }

  getTransferHistory(id: string, data: PaginationAndDataRange) {
    return this.http.post<TransferModel[]>(`${environment.apiBase}/transfer/get-history/${id}`, data)
  }

}
