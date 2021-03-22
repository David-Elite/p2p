import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { Zone } from 'app/modules/zone/zone.modal';
import { ZoneService } from 'app/modules/zone/zone.service';
import { SectionService } from '../../service/section/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input('referenceId') referenceId = '';

  @ViewChild('addLink') addLink;
  @ViewChild('addZone') addZone;

  sections: any;

  // Section Vars
  section;
  sectionId = '';
  sectionTitle = '';
  sectionSubtitle = '';
  sectionContentType = '';
  sectionDisplayType = '';

  // Links Vars
  linkId = '';
  linkTitle = '';
  linkSubtitle = '';
  linkUrl = '';
  linkIcon: File;
  displayIcon: string | ArrayBuffer = '';

  // Package Vars
  allPkgList = [];
  dispPkgList = [];
  selectedPkgs = [];
  searchPkg = '';

  // Zone Vars

  zoneEdit = false;
  zones: Zone[] = [];
  zoneType = '';
  zoneHead = '';
  zoneGridId = '';
  zoneList = [];


  constructor(
    private fuseProgressBarService: FuseProgressBarService,
    private sectionService: SectionService,
    private zoneService: ZoneService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.sectionService.getSections(this.referenceId).then(secs => {
      this.sections = secs;
    });
    this.getZones();
  }

  addSection(): void {
    this.fuseProgressBarService.show();
    if (!this.sectionId || this.sectionId === '') {
      this.sectionService.addSection({
        title: this.sectionTitle,
        subtitle: this.sectionSubtitle,
        referenceId: this.referenceId,
        contentType: this.sectionContentType,
        displayType: this.sectionDisplayType,
        position: this.sections.length + 1
      })
        .then(() => {
          this.section = null;
          this.sectionId = '';
          this.sectionTitle = '';
          this.sectionSubtitle = '';
          this.sectionContentType = '';
          this.sectionDisplayType = '';
          this.sectionService.getSections(this.referenceId)
            .then(secs => {
              this.sections = secs;
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Section Added', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            })
            .catch(err => {
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Section Added but Some Error in Updating Page. Kindly Refresh', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            });
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    } else {
      this.sectionService.editSection(this.sectionId, {
        title: this.sectionTitle,
        subtitle: this.sectionSubtitle,
      }).then(() => {
        this.clearSection();
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Section Saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      }).catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Saving Section', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    }

  }

  saveSection(): void {
    this.fuseProgressBarService.show();
    this.sectionService.editSection(this.sectionId, {
      title: this.sectionTitle,
      subtitle: this.sectionSubtitle,
    }).then(() => {
      this.clearSection();
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Section Saved', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    }).catch(err => {
      this.fuseProgressBarService.hide();
      this.matSnackBar.open('Some Error Saving Section', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

  updateSectionSequence(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.sectionService.updateSectionPosition(this.sections);
  }

  editSection(secId: string, el: HTMLElement): void {
    this.sectionId = secId;
    this.fuseProgressBarService.show();
    this.sectionService.getSection(secId)
      .then(section => {
        console.log(section);
        this.section = section;
        this.sectionTitle = section?.title;
        this.sectionSubtitle = section?.subtitle;
        this.sectionContentType = section?.content_type;
        this.sectionDisplayType = section?.display_type;
        this.selectedPkgs = section.packages
          .map(p => ({ ...this.allPkgList.find(pa => pa.id === p.package_id), position: p.position }))
          .sort((a, b) => a.position - b.position);
        console.log(this.selectedPkgs);
        el.scrollIntoView({ behavior: 'smooth' });
        this.fuseProgressBarService.hide();
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Fetching Section', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  clearSection(): void {
    this.section = null;
    this.sectionId = '';
    this.sectionTitle = '';
    this.sectionSubtitle = '';
    this.sectionContentType = '';
    this.sectionDisplayType = '';
  }

  deleteSection(secId: string): void {
    this.fuseProgressBarService.show();
    this.sectionService.deleteSection(secId)
      .then(() => {
        this.sectionService.getSections(this.referenceId).then(res => {
          this.sections = res;
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Section Deleted', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Occured', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  uploadLinkIcon(event: any): void {
    this.linkIcon = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.linkIcon);
    reader.onload = (_event) => {
      this.displayIcon = reader.result;
    };
  }

  openAddLink(): void {
    this.matDialog.open(this.addLink).afterClosed().subscribe(res => {
      if (res) {
        this.saveLink(this.sectionId);
      }
    });
  }

  saveLink(referenceId: string): void {
    this.fuseProgressBarService.show();
    if (this.linkId === '' || this.linkId === null) {
      this.sectionService.addLink(referenceId, {
        title: this.linkTitle,
        subtitle: this.linkSubtitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkSubtitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
          this.sectionService.getSection(this.sectionId)
            .then(section => {
              this.section = section;
              this.sectionTitle = section?.title;
              this.sectionSubtitle = section?.subtitle;
              this.sectionContentType = section?.content_type;
              this.sectionDisplayType = section?.display_type;
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Link Added in Section', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            })
            .catch(err => {
              this.fuseProgressBarService.hide();
              this.matSnackBar.open('Link Added but Some Error Fetching Section!! Kindly Refresh', 'OK', {
                verticalPosition: 'top',
                duration: 2000
              });
            });

        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    } else {
      this.sectionService.editLink(this.sectionId, this.linkId, {
        title: this.linkTitle,
        subtitle: this.linkSubtitle,
        url: this.linkUrl
      }, this.linkIcon)
        .then(() => {
          this.linkId = '';
          this.linkTitle = '';
          this.linkSubtitle = '';
          this.linkIcon = null;
          this.displayIcon = '';
          this.linkUrl = '';
        })
        .catch(err => {
          this.fuseProgressBarService.hide();
          this.matSnackBar.open('Some Error Occured', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        });
    }
  }

  editLink(linkId: string, type: string): void {
    this.linkId = linkId;
    const link = this.section.links.find(m => m.id === linkId);
    this.linkTitle = link?.title;
    this.linkSubtitle = link?.subtitle;
    this.linkUrl = link?.url;
    this.displayIcon = link?.icon;
    this.linkIcon = null;
    if (type === 'section') {
      this.matDialog.open(this.addLink).afterClosed().subscribe(res => {
        if (res) {
          this.saveLink(this.sectionId);
        }
      });
    }

  }


  clearLink(): void {
    this.linkId = '';
    this.linkTitle = '';
    this.linkSubtitle = '';
    this.linkIcon = null;
    this.displayIcon = '';
    this.linkUrl = '';
  }

  deleteLink(linkId: string, type: string): void {
    this.fuseProgressBarService.show();
    this.sectionService.deleteLink(linkId)
      .then(() => {
        this.sectionService.getSection(this.sectionId)
          .then(section => {
            this.section = section;
            this.sectionTitle = section?.title;
            this.sectionSubtitle = section?.subtitle;
            this.sectionContentType = section?.content_type;
            this.sectionDisplayType = section?.display_type;
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Link Deleted', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          })
          .catch(err => {
            this.fuseProgressBarService.hide();
            this.matSnackBar.open('Link Deleted but Some Error while Updating!! Kindly Refresh', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          });
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
        this.matSnackBar.open('Some Error Occured', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  addToSelection(pkgId: string): void {
    const pkg = this.allPkgList.find(p => p.id === pkgId);
    const pos = this.selectedPkgs.length + 1;
    this.selectedPkgs.push({ ...pkg, position: pos });
    this.sectionService.addPackageToSection(this.sectionId, pkg.id, pos);
  }

  updateProductSequence(event): void {
    moveItemInArray(this.selectedPkgs, event.previousIndex, event.currentIndex);
    this.sectionService.updatePackagePosition(this.sectionId, this.selectedPkgs);
  }

  removePkgFromSelection(pkgId): void {

  }

  isSelectedPkg(pkgId: string): boolean {
    return (this.selectedPkgs.findIndex(p => (p.id === pkgId)) !== -1);
  }

  openAddZones(): void {
    if (this.zoneType !== '' && this.zoneHead !== '') {
      this.zoneEdit = true;
    } else {
      this.zoneEdit = false;
    }
    this.matDialog.open(this.addZone).afterClosed().subscribe(res => {
      if (res) {
        this.saveZone();
      }
    });
  }

  getZones(): void {
    this.zoneService.getZones().subscribe(res => {
      console.log(res);
      this.zones = res;
    });
  }

  changeZone(event: any): void {
    console.log(event.checked);
    if (event.checked) {
      this.zoneList.push(event.source.value);
    } else {
      const i = this.zoneList.findIndex(x => x.value === event.source.value);
      this.zoneList.splice(i, 1);
    }
    console.log(this.zoneList);
  }

  saveZone(): void {
    this.fuseProgressBarService.show();
    if (this.zoneEdit) {
      this.sectionService.editZoneGrid(this.sectionId, this.zoneGridId, this.zoneList).then( res => {
        this.clearEditZone();
        this.sectionService.getSection(this.sectionId)
              .then(section => {
                this.section = section;
                this.sectionTitle = section?.title;
                this.sectionSubtitle = section?.subtitle;
                this.sectionContentType = section?.content_type;
                this.sectionDisplayType = section?.display_type;
                this.fuseProgressBarService.hide();
                this.matSnackBar.open('Zones Added in Section', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });
              })
              .catch(err => {
                this.fuseProgressBarService.hide();
                this.matSnackBar.open('Zones Added but Some Error Fetching Section!! Kindly Refresh', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });
              });
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
                this.matSnackBar.open('Some Error Occurred!! Kindly Retry', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });
      });
    } else {
      this.sectionService.addZone(this.sectionId, this.zoneHead, this.zoneList).then( res => {
        this.clearEditZone();
        this.sectionService.getSection(this.sectionId)
              .then(section => {
                this.section = section;
                this.sectionTitle = section?.title;
                this.sectionSubtitle = section?.subtitle;
                this.sectionContentType = section?.content_type;
                this.sectionDisplayType = section?.display_type;
                this.fuseProgressBarService.hide();
                this.matSnackBar.open('Zones Added in Section', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });
              })
              .catch(err => {
                this.fuseProgressBarService.hide();
                this.matSnackBar.open('Zones Added but Some Error Fetching Section!! Kindly Refresh', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });
              });
      })
      .catch(err => {
        this.fuseProgressBarService.hide();
                this.matSnackBar.open('Some Error Occurred!! Kindly Retry', 'OK', {
                  verticalPosition: 'top',
                  duration: 2000
                });
      });
    }
  }

  getZoneGrid(parent: string) {
    return this.section.zones.filter(z => z.parent === parent);
  }

  editZoneGrid(gridId: string) {
    const z = this.section.zones.find( a => a.id === gridId);
    this.zoneType = z.zoneType;
    this.zoneHead = z.zoneId;
    this.zoneGridId = z.id;
    this.zoneList = this.section.zones.filter( a => a.parent === z.id).map( a => a.zoneId );
    console.log(this.zoneList);
    this.openAddZones();
  }

  deleteZoneGrid(gridId: string) {
    this.sectionService.deleteZoneGrid(gridId).then(() => {
      this.matSnackBar.open('Zone Grid Deleted', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    })
    .catch(err => {
      this.matSnackBar.open('Some Error Occurred!! Kindly Retry', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    })
  }

  clearEditZone() {
    this.zoneType = '';
    this.zoneHead = '';
    this.zoneList = [];
  }

  isZoneChecked(id: string): boolean {
    const res = this.zoneList.findIndex(z => z === id) !== -1;
    // console.log(id + ' ' + res);
    return res;
  }


  // zoneSort(unsortZones: Zone[]){
  //   this.zones = [];
  //   unsortZones.filter(z => (z.parent === null || z.parent === '')).forEach( z => {
  //     const temp = this.getPnC(z, unsortZones);
  //     this.zones.push(...temp);
  //   });
  // }

  // getPnC(z: Zone, unsortZones: Zone[]): Zone[] {
  //   const zn: Zone[] = [];
  //   zn.push(z);
  //   unsortZones.filter(uz => uz.parent === z.id).forEach( zon => {
  //     // zn.push(zon);
  //     zn.push(...this.getPnC(zon, unsortZones));
  //   });
  //   return zn;
  // }


}
