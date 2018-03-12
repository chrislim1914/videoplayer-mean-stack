import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from './../video.service';

@Component({
    selector: 'app-video-center',
    templateUrl: './video-center.component.html',
    styleUrls: ['./video-center.component.css'],
    providers: [VideoService]
})

export class VideoCenterComponent implements OnInit {
    
    videos: Array<Video>;
    selectedVideo: Video;

    private hideNewVideo: boolean = true;

    constructor(private _VideoService: VideoService) { }
  
    ngOnInit() {
        this._VideoService.getVideos()
            .subscribe(resVideoData => this.videos = resVideoData);
    }
    onSelectVideo(video:any) {
      this.selectedVideo = video;
      this.hideNewVideo = true;
    }

    onSubmitAddVideo(video: Video) {
        this._VideoService.addVideo(video)
            .subscribe(resNewVideo => {
                this.videos.push(resNewVideo);
                this.hideNewVideo = true;
                this.selectedVideo = resNewVideo;
            });
    }

    onUpdateVideoEvent(video: any) {
        this._VideoService.updateVideo(video)
            .subscribe(resVideoUpdate => video = resVideoUpdate);
        this.selectedVideo = null;
    }

    onDeleteVideoEvent(video: any) {
        let videoArray = this.videos;
        this._VideoService.deleteVideo(video)
            .subscribe(resDeleteVideo => {
                for(let i=0; i < videoArray.length; i++) {
                    if(videoArray[i]._id === video._id) {
                        videoArray.slice(i,1);
                    } 
                }
            });
        this.selectedVideo = null;
    }

    newVideo() {
        this.hideNewVideo = false;
    }

}
