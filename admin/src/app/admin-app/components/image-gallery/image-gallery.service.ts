import {ImageAlbumModel, ImageAlbumResponse, ImageGalleryModel, ImageGalleryResponse} from './image-gallery.model';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import{Config} from "../../../shared/configs/general.config";
import{API_URL} from "../../../shared/configs/env.config";
import {FileOperrationService} from '../../../shared/services/fileOperation.service';

@Injectable()
export class ImageGalleryService {
    imageAlbumApiRoute:string = "gallery/album";
    imageGalleryApiRoute:string = "gallery/albumimage";
    progressObserver:any;
    progress:any;

    constructor(private _http:Http, private fileService:FileOperrationService) {
        // this.progress = Observable.create(observer => {
        //     this.progressObserver = observer
        // }).share();
    }

    /*  Image Album */

    saveImageAlbum(objSave:ImageAlbumModel) {
        let body = JSON.stringify(objSave);
        return this._http.post(API_URL + this.imageAlbumApiRoute, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    updateImageAlbum(objUpdate:ImageAlbumModel) {
        let body = JSON.stringify(objUpdate);
        return this._http.put(API_URL + this.imageAlbumApiRoute + "/" + objUpdate._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }

    getImageAlbumList(perPage:number, currentPage:number):Observable < ImageAlbumResponse> {
        return this._http.get(API_URL + this.imageAlbumApiRoute + "?perpage=" + perPage + "&page=" + currentPage)
            .map(res =><ImageAlbumResponse>res.json())
            .catch(this.handleError);
    }

    getImageAlbumDetail(objId:string):Observable < ImageAlbumModel> {
        return this._http.get(API_URL + this.imageAlbumApiRoute + "/" + objId)
            .map(res =><ImageAlbumModel>res.json())
            .catch(this.handleError);
    }

    deleteImageAlbum(objDel:ImageAlbumModel):Observable<any> {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.imageAlbumApiRoute + "/" + objDel._id, body)
            .map(res => res.json())
            .catch(this.handleError);

    }


    /*  End Image Album */


    /*  Image Gallery */
    saveImage(albumId:string, objSave:ImageGalleryModel, file:File):Observable<any> {
        return Observable.create(observer => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objSave));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', API_URL + this.imageGalleryApiRoute + "/" + albumId, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    updateImage(albumId:string, objUpdate:ImageGalleryModel, file:File, imageDeleted:boolean):Observable<any> {
        return Observable.create(observer => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            if (file) {
                formData.append('imageName', file);
            }
            formData.append('data', JSON.stringify(objUpdate));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('PUT', API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + objUpdate._id + "?imagedeleted=" + imageDeleted, true);
            xhr.setRequestHeader("Authorization", Config.AuthToken);
            xhr.send(formData);
        });
    }

    updateCoverImage(albumId:string, objImage:ImageGalleryModel) {
        let body = JSON.stringify({});
        return this._http.patch(API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + objImage._id, body)
            .map(res => res.json());
    }

    getAlbumImageList(albumId:string, perPage:number, currentPage:number):Observable < ImageGalleryResponse> {
        return this._http.get(API_URL + this.imageGalleryApiRoute + "/" + albumId + "?perpage=" + perPage + "&page=" + currentPage)
            .map(res =><ImageGalleryResponse>res.json())
            .catch(this.handleError);
    }


    getImageDetail(albumId:string, imageId:string):Observable < ImageGalleryModel> {
        return this._http.get(API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + imageId)
            .map(res =><ImageGalleryModel>res.json())
            .catch(this.handleError);
    }

    deleteAlbumImage(albumId:string, imageId:string):Observable < any> {
        return this._http.delete(API_URL + this.imageGalleryApiRoute + "/" + albumId + "/" + imageId)
            .map(res =><any>res.json())
            .catch(this.handleError);
    }

    deleteImageFile(fileName:string, orgExt:string, path:string):Observable < any > {
        return this.fileService.deleteFile(fileName, orgExt, path, "image");

    }

    /* End  Image Gallery */

    handleError(error) {
        console.log(error.json());
        return Observable.throw(error.json() || 'server error');
    }
}
