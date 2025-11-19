import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

declare const lottie: any; // expuesto por bodymovin

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class App implements AfterViewInit, OnDestroy {

  year = new Date().getFullYear();

  perfil = `Ingeniera en software especializada en el desarrollo de backend y uso de metodologías ágiles.
  Apta para diseñar y mejorar soluciones empresariales para entornos gubernamentales, colaborando de manera eficiente,
  tanto de forma independiente como en equipos multidisciplinarios.`;

  slogan = 'Diseño centrado en ciudadanía';
  nombre = 'Falon Carmona';

  projects = [
    {
      title: 'Eco Asistente IA',
      year: '2025',
      desc:
        'Aplicación web para fomentar la cultura del reciclaje en Costa Rica (adultos y niños) con apoyo de IA.',
      tech: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'MariaDB', 'ChatGPT'],
      link: '#',
    },
    {
      title: 'SIMEPCI',
      year: '2024',
      desc:
        'Módulo web para la gestión de rutas dentro del Poder Judicial, mejorando la trazabilidad y la eficiencia de procesos administrativos.',
      tech: ['C#', '.NET', 'Azure'],
      link: '#',
    },
    {
      title: 'ProveGuard',
      year: '2023',
      desc:
        'Sistema de inventarios para controlar activos y mejorar organización y distribución.',
      tech: ['HTML', 'CSS', 'SQL/JavaScript', 'MongoDB', 'Node.js'],
      link: '#',
    },
  ];

  // ---- Carrusel: control manual (botones) ----
  scrollCarousel(dir: 'prev' | 'next') {
    const el = document.querySelector<HTMLElement>('#projTrack');
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.proj-item');
    const step = card ? card.clientWidth + 24 : 320;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  }

  // ---- Carrusel: autoplay ----
  private autoTimer: any;
  

  private startAutoScroll() {
    const el = document.querySelector<HTMLElement>('#projTrack');
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.proj-item');
    const step = card ? card.clientWidth + 24 : 320;
    const total = () => el.scrollWidth - el.clientWidth;
    let current = el.scrollLeft;

    // seguridad: limpiar si ya existía
    if (this.autoTimer) clearInterval(this.autoTimer);

    this.autoTimer = setInterval(() => {
      current = el.scrollLeft;
      if (current >= total() - 5) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }

    }, 4500); // 
  }

  @ViewChild('anima2', { static: false }) anima2!: ElementRef<HTMLDivElement>;
    private lottieAnim?: any;


  // ---- Efectos que ya tenías ----
  ngAfterViewInit(): void {

     // ---- LOTTIE #2 (mouseover) ----
    if (this.anima2 && typeof lottie !== 'undefined') {
      this.lottieAnim = lottie.loadAnimation({
        container: this.anima2.nativeElement,
        path: 'https://lottie.host/a4cfbb30-b0f0-4c7f-a078-f482fd9e3543/xLCrHGbxWt.json',
        renderer: 'svg',
        loop: false,
        autoplay: false
      });

      this.anima2.nativeElement.addEventListener('mouseover', () => {
        this.lottieAnim?.playSegments([0, 150], true);
      });
    }


    // Reveal on scroll
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16 });
    els.forEach(el => io.observe(el));

    // Navbar shrink
    const nav = document.querySelector('.navbar') as HTMLElement | null;
    const onScroll = () => nav?.classList.toggle('shrink', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);

    // Iniciar autoplay del carrusel
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.lottieAnim) this.lottieAnim.destroy();
    if (this.autoTimer) clearInterval(this.autoTimer);
  }
}
