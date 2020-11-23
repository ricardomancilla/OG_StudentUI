import { Component, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
import { SidebarService } from '@app/_services';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  faTimes = faTimes;

  public defaultWidth = 580;

  @Input() id: string;
  @Input() title = '';

  private element: any;

  constructor(
    private sidebarService: SidebarService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    const sidebar = this;

    if (!this.id) {
      console.error('Sidebar must have an ID');
      return;
    }

    if (localStorage.getItem('sidebar_width') === null) {
      localStorage.setItem('sidebar_width', this.defaultWidth.toString());
    } else {
      this.defaultWidth = parseInt(localStorage.getItem('sidebar_width'), 10);
      const browserWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
      if (this.defaultWidth > browserWidth) {
        this.defaultWidth = browserWidth;
        this.setSidebarWidth(this.defaultWidth);
      }
    }

    document.body.appendChild(this.element);

    const sidebarComponentData = {
      id: this.id,
      title: this.title,
      open: function () { sidebar.open(); },
      close: function () { sidebar.close(); }
    };

    this.sidebarService.add(sidebarComponentData);
  }

  ngOnDestroy() {
    this.sidebarService.remove(this.id);
    this.element.remove();
  }

  private setSidebarWidth(width: number) {
    localStorage.setItem('sidebar_width', width.toString());
  }

  public open(): void {
    this.element.classList.add('sidebar__open');
  }

  public close(): void {
    this.element.classList.remove('sidebar__open');
  }

}