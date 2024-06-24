import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Finance } from '../models/finance';
import { Observable, from } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FinancesService {

    firestore = inject(Firestore);
    financesCollection = collection(this.firestore, 'finances');

    getFinance(): Observable<Finance[]> {
        return collectionData(this.financesCollection, {
            idField: 'id',
        }) as Observable<Finance[]>;
    }

    addFinance(finance: Finance): Observable<string> {
        const promise = addDoc(this.financesCollection, finance).then(
            (response) => response.id
        );
        return from(promise);
    }

    removeFinance(financeId: string): Observable<void> {
        const docRef = doc(this.firestore, 'finances/' + financeId);
        const promise = deleteDoc(docRef);
        return from(promise);
    }

    updateFinance(financeId: string, finance: Finance): Observable<void> {
        const docRef = doc(this.firestore, 'finances/' + financeId);
        const promise = setDoc(docRef, finance);
        return from(promise);
    }

}