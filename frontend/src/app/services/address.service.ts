import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseUrl = 'https://api.zippopotam.us/us';

  async getAddressByZip(zip: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${zip}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
  }
}
