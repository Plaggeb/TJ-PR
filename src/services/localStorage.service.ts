import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageService {
    keys: any;

    constructor(public http: Http, private storage: Storage) {
        this.storage.ready().then(() => {
            console.log("localStorage: Storage is ready");
        });
    }

    public set(key, val) {
        let obj = this;
        console.log('localStorage: set ' + key);
        obj.storage.set(key, val);
    }

    public setTTL(key, val, ttl) {
        let obj = this;
        obj.storage.set(key, val);
        let exp = Date.now() + (ttl * 1000);
        obj.storage.set(key + ".ttl", exp);
    }

    public getToken() {
        return this.storage.get('token').then(
            val => { console.log('The token is ' + val) }
        );
    }

    public getKeys() {
        return this.storage.keys().then(
            val => {
                this.keys = val;
            }
        );
    }

    public getCB(key, obj, cb) {
        console.log('called getCB for ' + key);
        this.storage.ready().then(() => {
            if (this.checkTTL(key)) {
                return this.storage.get(key).then(data => {
                    cb(obj, data);
                })
                .catch(err => {
                    console.log('xERROR ' + err);
                    cb(obj, undefined);
                });
            }
        });
    }

    public getZ(key) {
        console.log('called getZ for ' + key);
        if(this.checkTTL(key)) {
            return this.storage.get(key).then(data => {

            },
            err => {
                console.log('No key');
            });
        }
    }

    public checkTTL(key) {
        if (key.endsWith(".ttl")) {
            console.log("Do not check key " + key);
            return true;
        } 
        else
        {
            var ttlKey = key + '.ttl';
            if(this.has(ttlKey)) {
                console.log('Checking TTL for ' + key);
                this.storage.get(ttlKey).then(data => {
                    console.log('TTL value: ' + data);
                    let ttl = Number(data);
                    let date = new Date();
                    if(date.getTime() > ttl) {
                        console.log('Purge Key: ' + key);
                        this.storage.remove(key).then(rData => {
                            console.log('Removed Key: ' + key);
                            return false;
                        }, err => {
                            console.log('Error removing key: ' + err);
                            return false;
                        });
                    }
                    else 
                    {
                        console.log('TTL is okay');
                        return true;
                    }
                }, err => {
                    console.log('Error reading TTL: ' + err);
                    return false;
                });
            } 
            return true;
        }
    }

    public get(key) {
        let obj = this;
        
        console.log('This is of type: ' + typeof(this));
        console.log('localStorage: getLocal(' + key + ')');

        return new Promise(function (resolve, reject) {
            console.log('localStorgae: Getting key list');
            
            obj.storage.keys().then(keys => {
                console.log('localStorage: Retrieved keys '+ keys);
                if (keys.indexOf(key) >-1) {
                    console.log('localStorage: Found key: ' + key);
                    //Check for TTL
                    if(keys.indexOf(key + '.ttl') > -1) {
                        //Check if expired
                        obj.storage.get(key + '.ttl').then(val => {
                            let date = new Date();

                            if(date.getTime() > Number(val)) {
                                console.log('localStorage: the key ' + key + ' is expired (' + date.getTime() + ' > ' + val + ')');
                                obj.storage.remove(key).then( data => {
                                    console.log('localStorage: Removed key');
                                    reject('Key Expired');
                                }, err => {
                                    console.log('localStorage: Error removing key: ' + key);
                                    reject('Key remove error');
                                });
                            } 
                            else
                            {
                                console.log('localStorage: the key has not expired');
                                obj.storage.get(key).then( data => {
                                    resolve(data);
                                });
                            }
                        }, err => {
                            console.log('localStorage: Error getting TTL key');
                            reject('Error getting TTL key');
                        });
                    }
                    else {
                        console.log('localStorage: No TTL key exists for ' + key);
                        obj.storage.get(key).then(data => {
                            resolve(data);
                        });
                    }
                }
                else {
                    console.log('localStorage: Key does not exist: ' + key);
                    reject('Key does not exist');
                }
            }, err => {
                console.log('localStorage: Missing keys: ' + err);
                reject('Missing keys');
            });
        });
    }

    public has(key) {
        console.log("localStorage: Check for key " + key);
        // Key List
        this.storage.keys().then(keys => {
            console.log("localStorage: Retrieved keys " + keys);
            if ((this.keys !== undefined)  && (this.keys.indexOf(key) > -1)) {
                console.log("Found KEY " + key);
                // Check TTL
                if (this.keys.indexOf(key + ".ttl") > -1) {
                // Check Age
                this.storage.get(key + ".ttl").then(val => {
                    let date = new Date();
                    // Expired
                    if (date.getTime() > Number(val)) {
                    console.log("The key " + key + " has expired (" + date.getTime() + " > " + val + ")");
                    this.storage.remove(key).then(data => {
                        console.log("Removed the key, returning false");
                        return false;
                    },
                        err => {
                        console.error("Error removing key: " + err);
                        return false;
                        });
                    } else {
                    console.log("The key is not expired");
                    return true;
                    }
                },
                    err => {
                    console.log("Error getting ttl key");
                    return false;
                    });
                }
                else
                {
                    console.log("No TTL KEY exists for " + key);
                    return true;
                }
            } 
            else 
            {
                console.log("Key doesn't exist");
                return false;
            }
        }, err => 
        {
            console.error("Error getting keys " + err);
            return false;
        });
    }

    public hasOLD(key) {
        this.getKeys();
        //console.log("Check KEY (" + key + ") in Localstorage");
        //console.log("KEYS = " + this.keys);
        if (this.keys !== undefined) {
          if (this.keys.indexOf(key) > -1) {
            //console.log("FOUND KEY " + key);
            var ttlstatus = this.checkTTL(key);
            if (ttlstatus) {
              //console.log("TTL status is true");
            } else {
              //console.log("TTL status is false");
            }
            return ttlstatus;
          } else {
            //console.log("R FALSE");
            return false;
          }
        }
      }

      public delete(key) {
        return this.storage.remove(key);
      }
    
      public clearAll() {
        this.storage.clear().then(() => {
          console.log('Cleared all');
        });
      }
}