(function () {
  'use strict';

  var ASSETS = 'assets/';
  var layoutRoutes = ['/', '/home-2', '/about', '/events', '/events/1', '/events/2', '/blog', '/blog/1', '/pricing', '/contact'];
  var fullPageRoutes = ['/login', '/register', '/dashboard', '/admin', '/maintenance', '/404-demo'];

  function getPath() {
    var hash = window.location.hash.slice(1) || '/';
    return hash.startsWith('/') ? hash : '/' + hash;
  }

  function isLayoutRoute(path) {
    return layoutRoutes.indexOf(path) !== -1 || (path.startsWith('/events/') && path !== '/events') || (path.startsWith('/blog/') && path !== '/blog');
  }

  function isFullPageRoute(path) {
    return fullPageRoutes.indexOf(path) !== -1;
  }

  function showLayout(show) {
    var layout = document.getElementById('layout-wrapper');
    if (layout) layout.classList.toggle('hidden', !show);
  }

  function showPage(routeId) {
    document.querySelectorAll('.page-content, .page-full').forEach(function (el) {
      el.classList.add('hidden');
    });
    var el = document.querySelector('[data-route="' + routeId + '"]');
    if (el) el.classList.remove('hidden');
  }

  function route() {
    var path = getPath();
    var homeContent = document.getElementById('home-dropdown-content');
    if (homeContent) homeContent.classList.add('hidden');
    if (isLayoutRoute(path)) {
      showLayout(true);
      var norm = path === '/' ? '/' : path;
      if (path.startsWith('/events/')) norm = path;
      if (path.startsWith('/blog/')) norm = path;
      showPage(norm);
      renderLayoutPage(norm);
      updateNavState(path);
    } else if (isFullPageRoute(path)) {
      showLayout(false);
      showPage(path);
      renderFullPage(path);
    } else {
      showLayout(false);
      showPage('*');
      var notfound = document.getElementById('page-notfound-catch');
      if (notfound) {
        notfound.classList.remove('hidden');
        notfound.innerHTML = '<div class="flex min-h-screen items-center justify-center bg-muted"><div class="text-center"><h1 class="mb-4 text-4xl font-bold">404</h1><p class="mb-4 text-xl text-muted-foreground">Oops! Page not found</p><a href="#/" class="text-primary underline hover:text-primary/90">Return to Home</a></div></div>';
      }
    }
  }

  function updateNavState(path) {
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (a) {
      var dataPath = a.getAttribute('data-path');
      if (dataPath === path || (path === '/' && dataPath === '/') || (path.startsWith('/events') && dataPath === '/events') || (path.startsWith('/blog') && dataPath === '/blog')) {
        a.classList.add('bg-primary/10', 'text-primary');
        a.classList.remove('text-foreground');
      } else {
        a.classList.remove('bg-primary/10', 'text-primary');
        a.classList.add('text-foreground');
      }
    });
  }

  var featuresIndex = [
    { title: 'Weekly Events', desc: 'Join organized hikes, climbs, and camping trips every week with experienced guides.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { title: 'Community', desc: 'Connect with like-minded adventurers and make lifelong friends.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { title: 'Epic Locations', desc: 'Discover hidden trails and breathtaking destinations across the region.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
    { title: 'Share Memories', desc: 'Capture and share your adventure photos with the club community.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' }
  ];
  var upcomingEventsIndex = [
    { id: 1, title: 'Summit Trail Expedition', date: 'Jan 25, 2026', location: 'Rocky Mountain Park', difficulty: 'Moderate', spots: 8, image: ASSETS + 'hero-mountain.jpg' },
    { id: 2, title: 'Sunrise Kayaking', date: 'Jan 28, 2026', location: 'Crystal Lake', difficulty: 'Easy', spots: 12, image: ASSETS + 'kayaking.jpg' },
    { id: 3, title: 'Night Sky Camping', date: 'Feb 1, 2026', location: 'Starlight Valley', difficulty: 'Beginner', spots: 20, image: ASSETS + 'camping-night.jpg' }
  ];
  var activitiesIndex = [
    { title: 'Hiking', image: ASSETS + 'hiking-group.jpg', count: 48 },
    { title: 'Kayaking', image: ASSETS + 'kayaking.jpg', count: 24 },
    { title: 'Rock Climbing', image: ASSETS + 'rock-climbing.jpg', count: 16 },
    { title: 'Camping', image: ASSETS + 'camping-night.jpg', count: 32 }
  ];
  var statsIndex = [
    { value: '2,500+', label: 'Active Members', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { value: '180+', label: 'Events Per Year', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { value: '50+', label: 'Trails Explored', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' },
    { value: '12', label: 'Years Experience', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' }
  ];

  function renderLayoutPage(route) {
    if (route === '/home-2') {
      var vh2 = document.getElementById('values-home2');
      if (vh2) vh2.innerHTML = [
        { title: 'Safety First', desc: 'Every adventure is carefully planned with safety as the top priority.' },
        { title: 'Expert Guides', desc: 'Certified professionals lead every expedition with expertise and care.' },
        { title: 'Inclusivity', desc: 'Adventures for all skill levels, from beginners to experienced explorers.' },
        { title: 'Eco-Conscious', desc: 'We practice and promote leave-no-trace principles on every trip.' }
      ].map(function (v, i) {
        return '<div class="flex gap-5 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors animate-slide-up" style="animation-delay:' + (i * 100) + 'ms"><div class="w-14 h-14 flex-shrink-0 rounded-xl bg-primary/10 flex items-center justify-center"><svg class="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><h3 class="font-heading text-xl font-bold text-foreground mb-2">' + v.title + '</h3><p class="text-muted-foreground">' + v.desc + '</p></div></div>';
      }).join('');
    }
    if (route === '/about') {
      var va = document.getElementById('values-about');
      if (va) va.innerHTML = [
        { title: 'Community First', desc: 'We believe the best adventures are shared. Our community is built on friendship, support, and shared passion for the outdoors.' },
        { title: 'Safety Always', desc: 'Every trip is meticulously planned with safety as the top priority. Our guides are certified and our protocols are industry-leading.' },
        { title: 'Excellence in Adventure', desc: 'We curate exceptional experiences that challenge, inspire, and create lasting memories for our members.' }
      ].map(function (v, i) {
        return '<div class="text-center p-8 bg-card rounded-2xl border border-border animate-slide-up" style="animation-delay:' + (i * 100) + 'ms"><div class="w-16 h-16 mx-auto mb-6 rounded-2xl hero-gradient flex items-center justify-center"><svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><h3 class="font-heading text-xl font-bold text-foreground mb-3">' + v.title + '</h3><p class="text-muted-foreground">' + v.desc + '</p></div>';
      }).join('');
      var team = document.getElementById('team-about');
      if (team) team.innerHTML = [
        { name: 'Sarah Johnson', role: 'Founder & Lead Guide', bio: '15 years of mountaineering experience. Certified wilderness first responder.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200' },
        { name: 'Mike Chen', role: 'Kayak & Water Sports', bio: 'Former Olympic kayaker. Passionate about water safety education.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200' },
        { name: 'Emma Williams', role: 'Rock Climbing Instructor', bio: 'AMGA certified guide. Climbed peaks across 4 continents.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200' },
        { name: 'David Park', role: 'Trail Running Coach', bio: 'Ultra-marathon runner. Completed over 50 trail races.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200' }
      ].map(function (m, i) {
        return '<div class="card-adventure p-6 text-center animate-scale-in" style="animation-delay:' + (i * 100) + 'ms"><div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20"><img src="' + m.image + '" alt="' + m.name + '" class="w-full h-full object-cover"/></div><h3 class="font-heading text-lg font-bold text-foreground">' + m.name + '</h3><p class="text-sm text-primary font-medium mb-2">' + m.role + '</p><p class="text-sm text-muted-foreground">' + m.bio + '</p></div>';
      }).join('');
      var mil = document.getElementById('milestones-about');
      if (mil) {
        mil.classList.add('relative');
        mil.innerHTML = '<div class="absolute top-0 bottom-0 start-4 -translate-x-1/2 md:start-1/2 md:-translate-x-1/2 w-0.5 bg-border -z-10"></div>' + [
          { year: '2014', event: 'Adventure Club founded with 12 members' },
          { year: '2016', event: 'Reached 500 active members' },
          { year: '2018', event: 'Launched equipment rental program' },
          { year: '2020', event: 'Virtual community events during pandemic' },
          { year: '2022', event: 'Opened second chapter in neighboring state' },
          { year: '2024', event: 'Celebrated 10 years with 2,500+ members' }
        ].map(function (m, i) {
          var even = i % 2 === 0;
          return '<div class="relative flex items-center gap-4 md:gap-8 mb-8 ' + (even ? 'md:flex-row' : 'md:flex-row-reverse') + '"><div class="flex-1 ' + (even ? 'md:text-end' : 'md:text-start') + ' ps-12 md:ps-0"><div class="font-heading text-xl font-bold text-primary">' + m.year + '</div><p class="text-muted-foreground">' + m.event + '</p></div><div class="absolute start-4 md:relative md:start-auto w-2 h-2 bg-primary rounded-full z-10 -translate-x-1 md:translate-x-0"></div><div class="flex-1 hidden md:block"></div></div>';
        }).join('');
      }
    }
    if (route === '/') {
      var feat = document.getElementById('features-index');
      if (feat) feat.innerHTML = featuresIndex.map(function (f, i) {
        return '<div class="card-adventure p-6 text-center group animate-slide-up" style="animation-delay:' + (i * 100) + 'ms"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl hero-gradient flex items-center justify-center transform group-hover:scale-110 transition-transform"><div class="w-8 h-8 text-white">' + f.icon + '</div></div><h3 class="font-heading text-xl font-bold text-foreground mb-2">' + f.title + '</h3><p class="text-muted-foreground text-sm">' + f.desc + '</p></div>';
      }).join('');
      var ev = document.getElementById('upcoming-events-index');
      if (ev) ev.innerHTML = upcomingEventsIndex.map(function (e, i) {
        return '<a href="#/events/' + e.id + '" class="card-adventure group animate-slide-up" style="animation-delay:' + (i * 100) + 'ms"><div class="relative h-48 overflow-hidden rounded-t-xl"><img src="' + e.image + '" alt="' + e.title + '" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/><div class="absolute top-4 right-4 px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full">' + e.difficulty + '</div></div><div class="p-5"><h3 class="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">' + e.title + '</h3><div class="flex items-center gap-4 text-sm text-muted-foreground mb-3"><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4M16 2v4M3 10h18M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z"/></svg> ' + e.date + '</span><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ' + e.location + '</span></div><div class="flex items-center justify-between"><span class="text-sm text-success font-medium">' + e.spots + ' spots left</span><span class="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <svg class="w-4 h-4 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></div></div></a>';
      }).join('');
      var act = document.getElementById('activities-index');
      if (act) act.innerHTML = activitiesIndex.map(function (a, i) {
        return '<div class="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer animate-scale-in" style="animation-delay:' + (i * 100) + 'ms"><img src="' + a.image + '" alt="' + a.title + '" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/><div class="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"></div><div class="absolute bottom-0 left-0 right-0 p-4 md:p-6"><h3 class="font-heading text-lg md:text-xl font-bold text-white">' + a.title + '</h3><p class="text-white/80 text-sm">' + a.count + ' events this year</p></div></div>';
      }).join('');
      var st = document.getElementById('stats-index');
      if (st) st.innerHTML = statsIndex.map(function (s) {
        return '<div class="text-center"><div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center"><div class="w-6 h-6 text-primary">' + s.icon + '</div></div><div class="font-heading text-3xl md:text-4xl font-bold text-foreground">' + s.value + '</div><div class="text-muted-foreground text-sm">' + s.label + '</div></div>';
      }).join('');
    }

    if (route === '/events') {
      renderEventsPage();
    }
    if (route === '/events/1' || route === '/events/2') {
      var id = route === '/events/1' ? '1' : '2';
      renderEventDetail(id);
    }
    if (route === '/blog') {
      renderBlogPage();
    }
    if (route === '/blog/1') {
      renderBlogDetail();
    }
    if (route === '/pricing') {
      renderPricingPage();
      initAccordions();
    }
    if (route === '/dashboard') {
      initDashboardTabs();
    }
  }

  function renderFullPage(path) {
    var container = document.querySelector('[data-route="' + path + '"]');
    if (!container || container.innerHTML.trim()) return;
    if (path === '/login') container.innerHTML = getLoginHTML();
    if (path === '/register') container.innerHTML = getRegisterHTML();
    if (path === '/dashboard') {
      container.innerHTML = getDashboardHTML();
      var ds = document.getElementById('dashboard-stats');
      if (ds) ds.innerHTML = [
        { label: 'Events Joined', value: '24', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4M16 2v4M3 10h18M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z"/></svg>', color: 'primary' },
        { label: 'Trails Explored', value: '18', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>', color: 'secondary' },
        { label: 'Photos Shared', value: '156', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>', color: 'success' },
        { label: 'Friends Made', value: '42', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>', color: 'info' }
      ].map(function (s) {
        return '<div class="card-adventure p-5 hover:shadow-lg transition-shadow"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 rounded-xl bg-' + s.color + '/10 flex items-center justify-center"><div class="w-6 h-6 text-' + s.color + '">' + s.icon + '</div></div></div><div class="font-heading text-3xl font-bold text-foreground mb-1">' + s.value + '</div><div class="text-sm text-muted-foreground">' + s.label + '</div></div>';
      }).join('');
      initDashboardTabs();
    }
    if (path === '/admin') {
      container.innerHTML = getAdminHTML();
      var astats = document.getElementById('admin-stats');
      if (astats) astats.innerHTML = [
        { label: 'Total Members', value: '2,547', change: '+12%', trend: 'up' },
        { label: 'Active Events', value: '24', change: '+3', trend: 'up' },
        { label: 'Blog Posts', value: '156', change: '+8', trend: 'up' },
        { label: 'Messages', value: '42', change: '-5%', trend: 'down' }
      ].map(function (s) {
        var trendSvg = s.trend === 'up' ? '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>' : '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
        var trendCl = s.trend === 'up' ? 'text-success' : 'text-destructive';
        return '<div class="card-adventure p-5"><div class="flex items-start justify-between mb-3"><div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><div class="flex items-center gap-1 text-sm ' + trendCl + '">' + trendSvg + ' ' + s.change + '</div></div><div class="font-heading text-2xl font-bold text-foreground">' + s.value + '</div><div class="text-sm text-muted-foreground">' + s.label + '</div></div>';
      }).join('');
      var amem = document.getElementById('admin-members');
      if (amem) amem.innerHTML = [
        { name: 'Alex Thompson', email: 'alex@example.com', plan: 'Adventurer', date: 'Jan 12, 2026' },
        { name: 'Sarah Miller', email: 'sarah@example.com', plan: 'Elite', date: 'Jan 11, 2026' },
        { name: 'Mike Johnson', email: 'mike@example.com', plan: 'Explorer', date: 'Jan 10, 2026' },
        { name: 'Emily Davis', email: 'emily@example.com', plan: 'Adventurer', date: 'Jan 9, 2026' }
      ].map(function (m) {
        return '<div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-muted"></div><div><p class="font-medium text-foreground">' + m.name + '</p><p class="text-sm text-muted-foreground">' + m.email + '</p></div></div><div class="text-right"><span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs mb-1">' + m.plan + '</span><p class="text-xs text-muted-foreground">' + m.date + '</p></div></div>';
      }).join('');
      var amsg = document.getElementById('admin-messages');
      if (amsg) amsg.innerHTML = [
        { from: 'John Doe', subject: 'Question about membership', time: '2 hours ago', unread: true },
        { from: 'Jane Smith', subject: 'Event cancellation request', time: '5 hours ago', unread: true },
        { from: 'Bob Wilson', subject: 'Equipment rental inquiry', time: '1 day ago', unread: false }
      ].map(function (msg) {
        return '<div class="p-3 rounded-lg ' + (msg.unread ? 'bg-primary/5' : 'bg-muted/50') + '"><div class="flex items-start justify-between mb-1"><p class="font-medium text-foreground text-sm">' + msg.from + '</p>' + (msg.unread ? '<span class="w-2 h-2 bg-secondary rounded-full"></span>' : '') + '</div><p class="text-sm text-muted-foreground line-clamp-1">' + msg.subject + '</p><p class="text-xs text-muted-foreground mt-1">' + msg.time + '</p></div>';
      }).join('');
      var aev = document.getElementById('admin-events-tbody');
      if (aev) aev.innerHTML = [
        { title: 'Summit Trail Expedition', date: 'Jan 25, 2026', reg: 12, cap: 15 },
        { title: 'Sunrise Kayaking', date: 'Jan 28, 2026', reg: 18, cap: 20 },
        { title: 'Night Sky Camping', date: 'Feb 1, 2026', reg: 25, cap: 30 }
      ].map(function (e) {
        var pct = (e.reg / e.cap) * 100;
        return '<tr class="border-b border-border last:border-0"><td class="p-4"><p class="font-medium text-foreground">' + e.title + '</p></td><td class="p-4 text-muted-foreground">' + e.date + '</td><td class="p-4"><div class="flex items-center gap-2"><div class="flex-1 h-2 bg-muted rounded-full max-w-[100px]"><div class="h-full bg-primary rounded-full" style="width:' + pct + '%"></div></div><span class="text-sm text-muted-foreground">' + e.reg + '/' + e.cap + '</span></div></td><td class="p-4"><span class="inline-flex items-center rounded-full border-0 bg-success/20 text-success text-xs px-2.5 py-0.5">Active</span></td></tr>';
      }).join('');
      initAdminSidebar(container);
    }
    if (path === '/maintenance') container.innerHTML = getMaintenanceHTML();
    if (path === '/404-demo') container.innerHTML = getNotFoundHTML();
    if (path === '/login' || path === '/register') initAuthToggles(container);
  }

  function getLoginHTML() {
    return '<div class="min-h-screen flex"><div class="hidden lg:flex lg:w-1/2 relative"><img src="' + ASSETS + 'summer-trail-expedition.jpg" alt="Mountain" class="absolute inset-0 w-full h-full object-cover"/><div class="absolute inset-0 hero-gradient opacity-80"></div><div class="relative z-10 flex flex-col justify-between p-12 text-primary-foreground"><div><a href="#/" class="flex items-center gap-2"><div class="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center"><svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div><span class="font-heading text-2xl font-bold">Adventure Club</span></a></div><div><h2 class="font-heading text-4xl font-bold mb-4">Welcome Back,<br/>Explorer</h2><p class="text-primary-foreground/80 text-lg">Your next adventure is waiting. Sign in to access your dashboard and upcoming events.</p></div><div class="text-sm text-primary-foreground/60">© 2026 ASR Adventure Club.</div></div></div><div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background"><div class="w-full max-w-md space-y-8"><div class="lg:hidden text-center mb-8"><a href="#/" class="inline-flex items-center gap-2"><div class="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center"><svg class="w-7 h-7 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div><span class="font-heading text-2xl font-bold text-foreground">Adventure Club</span></a></div><div class="text-center"><h1 class="font-heading text-3xl font-bold text-foreground mb-2">Sign In</h1><p class="text-muted-foreground">Enter your credentials to access your account</p></div><form class="space-y-6"><div class="space-y-2"><label for="email" class="text-sm font-medium leading-none">Email</label><input id="email" type="email" placeholder="you@example.com" class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base"/></div><div class="space-y-2"><label for="password" class="text-sm font-medium leading-none">Password</label><div class="relative"><input id="password" type="password" placeholder="••••••••" class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-12"/><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground password-toggle"><svg class="w-5 h-5 eye-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><svg class="w-5 h-5 eye-off hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg></button></div><div class="mt-2"><a href="#/forgot-password" class="text-sm text-primary hover:underline">Forgot password?</a></div></div><div class="flex items-center gap-2"><input type="checkbox" id="remember" class="h-4 w-4 rounded border border-primary"/><label for="remember" class="text-sm font-normal cursor-pointer">Remember me for 30 days</label></div><button type="submit" class="w-full h-12 btn-adventure text-lg">Sign In</button></form><p class="text-center text-sm text-muted-foreground">Don\'t have an account? <a href="#/register" class="text-primary font-semibold hover:underline">Sign up</a></p></div></div></div>';
  }

  function getRegisterHTML() {
    return '<div class="min-h-screen flex"><div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background"><div class="w-full max-w-md space-y-8"><div class="lg:hidden text-center mb-8"><a href="#/" class="inline-flex items-center gap-2"><div class="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center"><svg class="w-7 h-7 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div><span class="font-heading text-2xl font-bold text-foreground">Adventure Club</span></a></div><div class="text-center"><h1 class="font-heading text-3xl font-bold text-foreground mb-2">Create Account</h1><p class="text-muted-foreground">Join thousands of adventurers today</p></div><form class="space-y-5"><div class="grid grid-cols-2 gap-4"><div class="space-y-2"><label for="firstName" class="text-sm font-medium">First Name</label><input id="firstName" placeholder="John" class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2"/></div><div class="space-y-2"><label for="lastName" class="text-sm font-medium">Last Name</label><input id="lastName" placeholder="Doe" class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2"/></div></div><div class="space-y-2"><label for="reg-email" class="text-sm font-medium">Email</label><input id="reg-email" type="email" placeholder="you@example.com" class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2"/></div><div class="space-y-2"><label for="reg-password" class="text-sm font-medium">Password</label><div class="relative"><input id="reg-password" type="password" placeholder="Create a strong password" class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-12"/><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground password-toggle"><svg class="w-5 h-5 eye-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><svg class="w-5 h-5 eye-off hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg></button></div><p class="text-xs text-muted-foreground">Must be at least 8 characters with a number and symbol</p></div><div class="flex items-start gap-2"><input type="checkbox" id="terms" class="mt-1 h-4 w-4 rounded border border-primary"/><label for="terms" class="text-sm font-normal cursor-pointer">I agree to the <a href="#/terms" class="text-primary hover:underline">Terms of Service</a> and <a href="#/privacy" class="text-primary hover:underline">Privacy Policy</a></label></div><button type="submit" class="w-full h-12 btn-adventure text-lg">Create Account</button></form><p class="text-center text-sm text-muted-foreground">Already have an account? <a href="#/login" class="text-primary font-semibold hover:underline">Sign in</a></p></div></div><div class="hidden lg:flex lg:w-1/2 relative"><img src="' + ASSETS + 'forest-trail-run.jpg" alt="Mountain" class="absolute inset-0 w-full h-full object-cover"/><div class="absolute inset-0 hero-gradient opacity-80"></div><div class="relative z-10 flex flex-col justify-between p-12 text-primary-foreground"><div><a href="#/" class="flex items-center gap-2"><div class="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center"><svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div><span class="font-heading text-2xl font-bold">Adventure Club</span></a></div><div><h2 class="font-heading text-4xl font-bold mb-6">Start Your<br/>Adventure Today</h2><ul class="space-y-3"><li class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><span>Access to exclusive events</span></li><li class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><span>Equipment rental discounts</span></li><li class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><span>Community photo sharing</span></li><li class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><span>Expert-led adventures</span></li></ul></div><div class="text-sm text-primary-foreground/60">© 2026 ASR Adventure Club.</div></div></div></div>';
  }

  function getDashboardHTML() {
    return '<div class="min-h-screen bg-background"><header class="bg-card border-b sticky top-0 z-40 shadow-sm"><div class="container mx-auto px-4 flex items-center justify-between h-16"><a href="#/" class="flex items-center gap-2"><div class="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center"><svg class="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div><span class="font-heading text-base md:text-lg font-bold text-foreground">Adventure Club</span></a><div class="flex items-center gap-3"><button type="button" class="relative inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition-colors"><svg class="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><span class="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span></button><button type="button" id="dashboard-rtl-toggle" class="inline-flex items-center justify-center h-9 w-9 rounded-md border-2 border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 8 6 6M4 14l6-6M2 12h1M21 12h1M12 2v1M12 21v1"/></svg></button><div class="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground border border-border"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div></div></div></header><div class="container mx-auto px-4 py-8 space-y-8"><div class="mb-8"><h1 class="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Welcome back, Alex!</h1><p class="text-muted-foreground text-lg">Here\'s your adventure dashboard</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="card-adventure p-6 space-y-4 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-4"><div class="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shadow-lg"><svg class="w-8 h-8 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12.5" cy="7" r="4"/></svg></div><div><h2 class="font-heading text-xl font-bold text-foreground">Alex Johnson</h2><p class="text-sm text-muted-foreground flex items-center gap-1"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/></svg> Elite Member</p></div></div></div><div class="space-y-3"><div class="flex items-center justify-between text-sm"><span class="text-muted-foreground font-medium">Adventure Level</span><span class="font-bold text-primary">Trailblazer</span></div><div class="relative bg-muted h-3 rounded-full overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 shadow-inner" style="width:75%"></div></div><p class="text-xs text-muted-foreground text-center">750 / 1000 XP to next level</p></div></div><div class="card-adventure p-6 space-y-4 hover:shadow-xl transition-all duration-300 border-l-4 border-l-success"><div class="flex items-center gap-3 mb-3"><div class="w-14 h-14 rounded-2xl bg-success flex items-center justify-center shadow-lg"><svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><h3 class="font-heading text-lg font-semibold text-foreground">Membership</h3><p class="text-xs text-muted-foreground">Active Status</p></div></div><p class="text-sm text-muted-foreground">Valid until <span class="font-semibold text-foreground">Dec 2026</span></p><div class="flex gap-2"><button type="button" class="flex-1 h-9 rounded-md px-4 text-sm font-medium bg-success text-white hover:bg-success/90 transition-colors shadow-sm">Renew</button><button type="button" class="flex-1 h-9 rounded-md px-4 text-sm font-medium border border-success text-success hover:bg-success hover:text-white transition-colors">Upgrade</button></div></div><div class="card-adventure p-6 space-y-4 hover:shadow-xl transition-all duration-300 border-l-4 border-l-secondary"><div class="flex items-center gap-3 mb-3"><div class="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-lg"><svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v6m0 6v6m5.2-13.2l-4.3 4.3m0 6l4.3 4.3M6.8 6.8l4.3 4.3m0 6l-4.3 4.3M1 12h6m6 0h6m-13.2 5.2l4.3-4.3m6 0l4.3 4.3"/></svg></div><div><h3 class="font-heading text-lg font-semibold text-foreground">Weather</h3><p class="text-xs text-muted-foreground">Rocky Mountain Park</p></div></div><div class="flex items-baseline gap-2 mb-2"><span class="text-4xl font-heading font-bold text-foreground">12°C</span><svg class="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v6m0 6v6"/></svg></div><p class="text-sm text-muted-foreground">Clear skies • Perfect hiking weather</p></div></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="dashboard-stats"></div><div class="grid md:grid-cols-2 gap-6"><div class="card-adventure p-6 hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shadow-md"><svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div><h3 class="font-heading text-xl font-semibold text-foreground">Achievements</h3></div><div class="grid grid-cols-2 gap-3"><div class="p-4 rounded-xl bg-secondary/10 border border-secondary/20 hover:border-secondary/40 transition-all"><div class="text-3xl mb-2">🔥</div><div class="text-lg font-bold text-foreground">10</div><div class="text-xs text-muted-foreground">Hikes Completed</div></div><div class="p-4 rounded-xl bg-warning/10 border border-warning/20 hover:border-warning/40 transition-all"><div class="text-3xl mb-2">⭐</div><div class="text-lg font-bold text-foreground">5</div><div class="text-xs text-muted-foreground">Peaks Conquered</div></div><div class="p-4 rounded-xl bg-info/10 border border-info/20 hover:border-info/40 transition-all"><div class="text-3xl mb-2">📸</div><div class="text-lg font-bold text-foreground">156</div><div class="text-xs text-muted-foreground">Photos Shared</div></div><div class="p-4 rounded-xl bg-success/10 border border-success/20 hover:border-success/40 transition-all"><div class="text-3xl mb-2">🎯</div><div class="text-lg font-bold text-foreground">42</div><div class="text-xs text-muted-foreground">Friends Made</div></div></div></div><div class="card-adventure p-6 hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-6"><div class="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shadow-md"><svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><h3 class="font-heading text-xl font-semibold text-foreground">Recent Activity</h3></div><ul class="space-y-3"><li class="flex items-start gap-3 p-3 rounded-xl bg-success/10 hover:bg-success/20 transition-all"><svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><div class="flex-1"><div class="text-sm font-semibold text-foreground">Joined Summit Trail</div><div class="text-xs text-muted-foreground">2 days ago • Rocky Mountain Park</div></div></li><li class="flex items-start gap-3 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all"><svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><div class="flex-1"><div class="text-sm font-semibold text-foreground">Uploaded 12 photos</div><div class="text-xs text-muted-foreground">3 days ago • Forest Trail</div></div></li><li class="flex items-start gap-3 p-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-all"><svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><div class="flex-1"><div class="text-sm font-semibold text-foreground">Connected with Sarah M.</div><div class="text-xs text-muted-foreground">5 days ago • New friend</div></div></li></ul></div></div><div class="tabs-dashboard"><div class="bg-card border border-border p-1 rounded-xl inline-flex h-12 items-center gap-1 mb-6 shadow-md"><button type="button" class="tabs-trigger rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:bg-muted" data-tab="events">📅 Events</button><button type="button" class="tabs-trigger rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:bg-muted" data-tab="trips">🗺️ Trips</button><button type="button" class="tabs-trigger rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:bg-muted" data-tab="photos">📸 Photos</button></div><div id="tab-events" class="tab-panel space-y-4"></div><div id="tab-trips" class="tab-panel hidden mt-6 space-y-4"></div><div id="tab-photos" class="tab-panel hidden mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div></div></div></div>';

  }

  function getAdminHTML() {
    return '<div class="min-h-screen bg-background flex"><aside id="admin-sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform -translate-x-full lg:translate-x-0"><div class="flex flex-col h-full"><div class="p-4 border-b border-border"><a href="#/" class="flex items-center gap-2"><div class="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center"><svg class="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div><div><span class="font-heading font-bold text-foreground block">Adventure Club</span><span class="text-xs text-muted-foreground">Admin Panel</span></div></a></div><nav class="flex-1 p-4 space-y-1"><button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg><span class="font-medium">Dashboard</span></button><button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><span class="font-medium">Members</span></button><button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4M16 2v4M3 10h18M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z"/></svg><span class="font-medium">Events</span></button><button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg><span class="font-medium">Blog Posts</span></button><button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="font-medium">Messages</span><span class="ml-auto bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">42</span></button><button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg><span class="font-medium">Settings</span></button></nav><div class="p-4 border-t border-border"><a href="#/"><button type="button" class="w-full justify-start text-muted-foreground hover:text-foreground inline-flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg> Exit Admin</button></a></div></div></aside><div id="admin-overlay" class="fixed inset-0 bg-foreground/50 z-40 lg:hidden hidden"></div><div class="flex-1 lg:ml-64"><header class="sticky top-0 z-30 bg-card border-b border-border"><div class="flex items-center justify-between px-4 h-16"><div class="flex items-center gap-4"><button type="button" id="admin-menu-btn" class="lg:hidden inline-flex items-center justify-center h-10 w-10"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button><div class="relative hidden md:block"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input type="text" placeholder="Search..." class="w-64 pl-9 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"/></div></div><div class="flex items-center gap-2"><button type="button" class="admin-theme-toggle inline-flex items-center justify-center h-10 w-10 rounded-md"><span class="admin-sun hidden"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></svg></span><span class="admin-moon"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span></button><button type="button" class="relative inline-flex items-center justify-center h-10 w-10 rounded-md"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg><span class="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span></button><div class="w-9 h-9 rounded-full bg-muted"></div></div></div></header><main class="p-4 md:p-6 space-y-6"><div><h1 class="font-heading text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1><p class="text-muted-foreground">Welcome back! Here\'s what\'s happening with your club.</p></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4" id="admin-stats"></div><div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 card-adventure"><div class="p-5 border-b border-border flex items-center justify-between"><h2 class="font-heading text-lg font-bold text-foreground">Recent Members</h2><button type="button" class="text-primary text-sm">View All <svg class="w-4 h-4 ml-1 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button></div><div class="p-5 space-y-4" id="admin-members"></div></div><div class="card-adventure"><div class="p-5 border-b border-border flex items-center justify-between"><h2 class="font-heading text-lg font-bold text-foreground">Messages</h2><span class="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">42</span></div><div class="p-5 space-y-4" id="admin-messages"></div></div></div><div class="card-adventure"><div class="p-5 border-b border-border flex items-center justify-between"><h2 class="font-heading text-lg font-bold text-foreground">Upcoming Events</h2><button type="button" class="text-primary text-sm">Manage Events <svg class="w-4 h-4 ml-1 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button></div><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-border"><th class="text-left p-4 text-sm font-semibold text-muted-foreground">Event</th><th class="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th><th class="text-left p-4 text-sm font-semibold text-muted-foreground">Registrations</th><th class="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th></tr></thead><tbody id="admin-events-tbody"></tbody></table></div></div></main></div></div>';
  }

  function getMaintenanceHTML() {
    return '<div class="min-h-screen flex items-center justify-center bg-background p-4"><div class="text-center max-w-lg"><div class="relative w-24 h-24 mx-auto mb-8"><div class="w-24 h-24 rounded-2xl hero-gradient flex items-center justify-center"><svg class="w-12 h-12 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div><div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center animate-pulse"><svg class="w-5 h-5 text-secondary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div></div><h1 class="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">We\'ll Be Back Soon!</h1><p class="text-muted-foreground mb-8 text-lg">We\'re currently performing scheduled maintenance to improve your experience. Our trails will be open again shortly.</p><div class="card-adventure p-6 mb-8"><div class="flex items-center justify-center gap-2 text-muted-foreground mb-4"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Expected downtime: ~2 hours</span></div><p class="text-sm text-muted-foreground mb-4">Get notified when we\'re back:</p><div class="flex gap-2"><input type="email" placeholder="your@email.com" class="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2"/><button type="button" class="btn-adventure inline-flex items-center gap-2"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Notify Me</button></div></div><p class="text-sm text-muted-foreground">Need immediate assistance?</p><div class="flex flex-wrap justify-center gap-4 text-sm mt-4"><a href="mailto:support@adventureclub.com" class="text-primary hover:underline">support@adventureclub.com</a><span class="text-muted-foreground">|</span><a href="tel:+1234567890" class="text-primary hover:underline">+1 (234) 567-890</a></div><p class="mt-12 text-xs text-muted-foreground">© 2026 ASR Adventure Club. Powered by <span class="text-primary font-semibold">ASR</span></p></div></div>';
  }

  function getNotFoundHTML() {
    return '<div class="flex min-h-screen items-center justify-center bg-muted"><div class="text-center"><h1 class="mb-4 text-4xl font-bold">404</h1><p class="mb-4 text-xl text-muted-foreground">Oops! Page not found</p><a href="#/" class="text-primary underline hover:text-primary/90">Return to Home</a></div></div>';
  }

function initAuthToggles(container) {
  if (!container) return;

  // Password toggle logic
  container.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.relative');
      var input = wrap && wrap.querySelector('input[type="password"], input[type="text"]');
      var eyeOn = wrap && wrap.querySelector('.eye-on');
      var eyeOff = wrap && wrap.querySelector('.eye-off');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        if (eyeOn) eyeOn.classList.add('hidden');
        if (eyeOff) eyeOff.classList.remove('hidden');
      } else {
        input.type = 'password';
        if (eyeOn) eyeOn.classList.remove('hidden');
        if (eyeOff) eyeOff.classList.add('hidden');
      }
    });
  });

  // ✅ FORM SUBMIT HANDLER (OUTSIDE toggle click)
  var form = container.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Redirect after login/register
      window.location.hash = '/'; // or '/' for home
    });
  }
}


  function initAdminSidebar(container) {
    var sidebar = document.getElementById('admin-sidebar');
    var overlay = document.getElementById('admin-overlay');
    var menuBtn = document.getElementById('admin-menu-btn');
    var themeBtn = container && container.querySelector('.admin-theme-toggle');
    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('-translate-x-full');
        if (overlay) overlay.classList.toggle('hidden', !sidebar.classList.contains('-translate-x-full'));
      });
    }
    if (overlay) {
      overlay.addEventListener('click', function () {
        if (sidebar) sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
      });
    }
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        var sun = container.querySelector('.admin-sun');
        var moon = container.querySelector('.admin-moon');
        if (document.documentElement.classList.contains('dark')) {
          if (sun) sun.classList.remove('hidden');
          if (moon) moon.classList.add('hidden');
        } else {
          if (sun) sun.classList.add('hidden');
          if (moon) moon.classList.remove('hidden');
        }
      });
    }
  }

  function initDashboardTabs() {
    var rtlBtn = document.querySelector('#dashboard-rtl-toggle');
    if (rtlBtn) {
      rtlBtn.addEventListener('click', function () {
        var dir = document.documentElement.getAttribute('dir');
        document.documentElement.setAttribute('dir', dir === 'rtl' ? 'ltr' : 'rtl');
      });
    }

    var triggers = document.querySelectorAll('.tabs-trigger');
    var panels = document.querySelectorAll('.tab-panel');
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-tab');
        triggers.forEach(function (b) {
          b.classList.remove('bg-background', 'text-foreground', 'shadow-sm');
          b.removeAttribute('data-active');
        });
        btn.classList.add('bg-background', 'text-foreground', 'shadow-sm');
        btn.setAttribute('data-active', 'true');
        panels.forEach(function (p) {
          p.classList.add('hidden');
          if (p.id === 'tab-' + tab) p.classList.remove('hidden');
        });
        if (tab === 'events') renderDashboardEvents();
        if (tab === 'trips') renderDashboardTrips();
        if (tab === 'photos') renderDashboardPhotos();
      });
    });
    var first = document.querySelector('.tabs-trigger[data-tab="events"]');
    if (first) first.click();
  }

  function renderDashboardEvents() {
    var panel = document.getElementById('tab-events');
    if (!panel) return;
    var events = [
      { id: 1, title: 'Summit Trail Expedition', date: 'Jan 25, 2026', time: '6:00 AM', location: 'Rocky Mountain Park', image: ASSETS + 'hero-mountain.jpg', status: 'confirmed', difficulty: 'Moderate' },
      { id: 2, title: 'Sunrise Kayaking', date: 'Jan 28, 2026', time: '5:30 AM', location: 'Crystal Lake', image: ASSETS + 'kayaking.jpg', status: 'pending', difficulty: 'Easy' },
      { id: 3, title: 'Rock Climbing Workshop', date: 'Feb 5, 2026', time: '9:00 AM', location: 'Boulder Canyon', image: ASSETS + 'rock-climbing.jpg', status: 'available', difficulty: 'Advanced' },
      { id: 4, title: 'Night Sky Camping', date: 'Feb 10, 2026', time: '4:00 PM', location: 'Starlight Valley', image: ASSETS + 'camping-night.jpg', status: 'available', difficulty: 'Beginner' }
    ];
    var statusClass = { confirmed: 'bg-success text-success-foreground', pending: 'bg-warning text-warning-foreground', available: 'border-primary text-primary' };
    panel.innerHTML = events.map(function (e) {
      return '<div class="card-adventure p-4 flex gap-4"><img src="' + e.image + '" class="w-32 h-24 object-cover rounded-lg" alt=""/><div class="flex-1"><div class="flex justify-between mb-2"><h3 class="font-bold">' + e.title + '</h3><span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ' + (statusClass[e.status] || '') + '">' + (e.status === 'confirmed' ? 'Confirmed' : e.status === 'pending' ? 'Pending' : 'Available') + '</span></div><p class="text-sm text-muted-foreground">' + e.date + ' • ' + e.time + ' • ' + e.location + '</p></div></div>';
    }).join('');
  }

  function renderDashboardTrips() {
    var panel = document.getElementById('tab-trips');
    if (!panel) return;
    panel.innerHTML = '<div class="card-adventure p-6"><h3 class="font-bold text-lg">Summit Trail Expedition</h3><p class="text-sm text-muted-foreground">Expect early morning cold. Trail has some steep sections.</p></div>';
  }

  function renderDashboardPhotos() {
    var panel = document.getElementById('tab-photos');
    if (!panel) return;
    var photos = [
      { src: ASSETS + 'hero-mountain.jpg', event: 'Mountain Trek', date: 'Dec 15, 2025' },
      { src: ASSETS + 'kayaking.jpg', event: 'Lake Adventure', date: 'Dec 10, 2025' },
      { src: ASSETS + 'camping-night.jpg', event: 'Stargazing Camp', date: 'Dec 5, 2025' },
      { src: ASSETS + 'rock-climbing.jpg', event: 'Climbing Day', date: 'Nov 28, 2025' },
      { src: ASSETS + 'hiking-group.jpg', event: 'Forest Hike', date: 'Nov 20, 2025' },
      { src: ASSETS + 'hero-mountain.jpg', event: 'Sunset Peak', date: 'Nov 15, 2025' },
      { src: ASSETS + 'forest-trail-run.jpg', event: 'Trail Run', date: 'Nov 10, 2025' },
      { src: ASSETS + 'camping-night.jpg', event: 'Bonfire Night', date: 'Nov 5, 2025' }
    ];
    panel.innerHTML = photos.map(function (p) {
      return '<div class="rounded-xl overflow-hidden"><img src="' + p.src + '" class="w-full h-40 object-cover" alt=""/></div>';
    }).join('');
  }

  var eventsData = [
    { id: 1, title: 'Summit Trail Expedition', date: 'Jan 25, 2026', location: 'Rocky Mountain Park', difficulty: 'Moderate', activity: 'Hiking', spots: 8, maxSpots: 15, image: ASSETS + 'hero-mountain.jpg', description: 'A challenging hike to the summit with breathtaking views.' },
    { id: 2, title: 'Sunrise Kayaking', date: 'Jan 28, 2026', location: 'Crystal Lake', difficulty: 'Easy', activity: 'Kayaking', spots: 12, maxSpots: 20, image: ASSETS + 'kayaking.jpg', description: 'Peaceful morning paddle with stunning sunrise views.' },
    { id: 3, title: 'Night Sky Camping', date: 'Feb 1, 2026', location: 'Starlight Valley', difficulty: 'Beginner', activity: 'Camping', spots: 20, maxSpots: 30, image: ASSETS + 'camping-night.jpg', description: 'Overnight camping with stargazing and campfire stories.' },
    { id: 4, title: 'Rock Climbing Basics', date: 'Feb 5, 2026', location: 'Boulder Canyon', difficulty: 'Advanced', activity: 'Climbing', spots: 6, maxSpots: 10, image: ASSETS + 'rock-climbing.jpg', description: 'Learn essential climbing techniques with expert instructors.' },
    { id: 5, title: 'Forest Trail Run', date: 'Feb 8, 2026', location: 'Evergreen Forest', difficulty: 'Moderate', activity: 'Hiking', spots: 15, maxSpots: 25, image: ASSETS + 'hiking-group.jpg', description: 'Trail running through scenic forest paths.' },
    { id: 6, title: 'Mountain Photography Walk', date: 'Feb 12, 2026', location: 'Alpine Meadows', difficulty: 'Easy', activity: 'Hiking', spots: 10, maxSpots: 12, image: ASSETS + 'hero-mountain.jpg', description: 'Capture stunning landscapes with photography tips.' }
  ];

  function getDifficultyColor(d) {
    var s = (d || '').toLowerCase();
    if (s === 'beginner') return 'bg-success text-success-foreground';
    if (s === 'easy') return 'bg-info text-info-foreground';
    if (s === 'moderate') return 'bg-warning text-warning-foreground';
    if (s === 'advanced') return 'bg-destructive text-destructive-foreground';
    return 'bg-muted text-muted-foreground';
  }

  function renderEventsPage() {
    var grid = document.getElementById('events-grid');
    var empty = document.getElementById('events-empty');
    if (!grid) return;
    function update() {
      var q = (document.getElementById('events-search') && document.getElementById('events-search').value) || '';
      var diff = (document.getElementById('events-difficulty') && document.getElementById('events-difficulty').value) || 'all';
      var act = (document.getElementById('events-activity') && document.getElementById('events-activity').value) || 'all';
      var ql = q.toLowerCase();
      var list = eventsData.filter(function (e) {
        var matchSearch = !ql || e.title.toLowerCase().indexOf(ql) >= 0 || e.location.toLowerCase().indexOf(ql) >= 0;
        var matchDiff = diff === 'all' || e.difficulty.toLowerCase() === diff;
        var matchAct = act === 'all' || e.activity.toLowerCase() === act;
        return matchSearch && matchDiff && matchAct;
      });
      if (list.length === 0) {
        grid.innerHTML = '';
        grid.classList.add('hidden');
        if (empty) empty.classList.remove('hidden');
      } else {
        if (empty) empty.classList.add('hidden');
        grid.classList.remove('hidden');
        grid.innerHTML = '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">' + list.map(function (e, i) {
          return '<a href="#/events/' + e.id + '" class="card-adventure group animate-slide-up" style="animation-delay:' + (i * 50) + 'ms"><div class="relative h-48 overflow-hidden rounded-t-xl"><img src="' + e.image + '" alt="' + e.title + '" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/><div class="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ' + getDifficultyColor(e.difficulty) + '">' + e.difficulty + '</div><div class="absolute top-4 left-4 px-3 py-1 bg-card/90 text-foreground text-xs font-semibold rounded-full">' + e.activity + '</div></div><div class="p-5"><h3 class="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">' + e.title + '</h3><p class="text-sm text-muted-foreground mb-3 line-clamp-2">' + e.description + '</p><div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4"><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4M16 2v4M3 10h18M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z"/></svg> ' + e.date + '</span><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ' + e.location + '</span></div><div class="flex items-center justify-between"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><span class="text-sm"><span class="text-success font-medium">' + e.spots + '</span><span class="text-muted-foreground">/' + e.maxSpots + ' spots</span></span></div><span class="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">View Details <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></div></div></a>';
        }).join('') + '</div>';
      }
    }
    update();
    var searchEl = document.getElementById('events-search');
    var diffEl = document.getElementById('events-difficulty');
    var actEl = document.getElementById('events-activity');
    var clearBtn = document.getElementById('events-clear-filters');
    if (searchEl) searchEl.addEventListener('input', update);
    if (diffEl) diffEl.addEventListener('change', update);
    if (actEl) actEl.addEventListener('change', update);
    if (clearBtn) clearBtn.addEventListener('click', function () {
      if (searchEl) searchEl.value = '';
      if (diffEl) diffEl.value = 'all';
      if (actEl) actEl.value = 'all';
      update();
    });
  }

  var eventDetailsData = {
    '1': { title: 'Summit Trail Expedition', date: 'January 25, 2026', time: '6:00 AM - 4:00 PM', location: 'Rocky Mountain Park', meetingPoint: 'Trailhead Parking Lot A', difficulty: 'Moderate', spots: 8, maxSpots: 15, image: ASSETS + 'hero-mountain.jpg', leader: 'Sarah Johnson', description: 'Join us for an unforgettable hiking experience to the summit of Rocky Mountain. This moderate-level hike offers stunning panoramic views, diverse wildlife, and a rewarding sense of accomplishment.\n\nThe trail covers 12 miles round trip with an elevation gain of 2,500 feet. We\'ll take breaks at scenic viewpoints and have lunch at the summit before descending.', whatToBring: ['Sturdy hiking boots', 'Water (at least 2 liters)', 'Trail snacks and lunch', 'Rain jacket', 'Sun protection', 'First aid kit', 'Camera'], included: ['Experienced guide', 'Trail maps', 'Emergency equipment', 'Group photos'], requirements: ['Good physical fitness', 'Previous hiking experience recommended', 'Age 16+'] },
    '2': { title: 'Sunrise Kayaking', date: 'January 28, 2026', time: '5:30 AM - 9:00 AM', location: 'Crystal Lake', meetingPoint: 'Lake Marina Dock B', difficulty: 'Easy', spots: 12, maxSpots: 20, image: ASSETS + 'kayaking.jpg', leader: 'Mike Chen', description: 'Experience the magic of Crystal Lake at dawn. Watch the sun rise over the mountains while paddling through calm waters. Perfect for beginners and experienced paddlers alike.\n\nWe\'ll paddle approximately 5 miles exploring hidden coves and wildlife viewing spots. Hot coffee and breakfast provided after the paddle.', whatToBring: ['Quick-dry clothing', 'Water shoes or sandals', 'Change of clothes', 'Sunscreen', 'Water bottle'], included: ['Kayak and paddle', 'Life jacket', 'Waterproof bag', 'Breakfast', 'Certified instructor'], requirements: ['Ability to swim', 'Age 12+ (under 18 with guardian)'] }
  };

  function renderEventDetail(id) {
    var ev = eventDetailsData[id] || eventDetailsData['1'];
    var container = document.getElementById('event-detail-' + id);
    if (!container) return;
    var dc = getDifficultyColor(ev.difficulty);
    container.innerHTML = '<section class="relative h-[50vh] min-h-[400px]"><img src="' + ev.image + '" alt="' + ev.title + '" class="w-full h-full object-cover"/><div class="absolute inset-0 hero-overlay"></div><div class="absolute inset-0 flex items-end"><div class="container mx-auto px-4 pb-8"><a href="#/events"><button type="button" class="mb-4 inline-flex items-center text-primary-foreground hover:bg-primary-foreground/10 rounded-md px-4 py-2"><svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg> Back to Events</button></a><span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ' + dc + ' mb-4 block">' + ev.difficulty + '</span><h1 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">' + ev.title + '</h1><div class="flex flex-wrap gap-4 text-primary-foreground/90"><span class="flex items-center gap-2"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4M16 2v4M3 10h18M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z"/></svg> ' + ev.date + '</span><span class="flex items-center gap-2"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ' + ev.time + '</span><span class="flex items-center gap-2"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ' + ev.location + '</span></div></div></div></section><section class="section-padding bg-background"><div class="container mx-auto px-4"><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-8"><div><h2 class="font-heading text-2xl font-bold text-foreground mb-4">About This Event</h2><div class="prose prose-lg text-muted-foreground whitespace-pre-line">' + ev.description.replace(/\n/g, '<br/>') + '</div></div><div class="grid md:grid-cols-2 gap-6"><div class="card-adventure p-6"><h3 class="font-heading text-lg font-bold text-foreground mb-4">What to Bring</h3><ul class="space-y-2">' + ev.whatToBring.map(function (x) { return '<li class="flex items-center gap-3 text-sm text-muted-foreground"><svg class="w-4 h-4 text-success flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>' + x + '</li>'; }).join('') + '</ul></div><div class="card-adventure p-6"><h3 class="font-heading text-lg font-bold text-foreground mb-4">What\'s Included</h3><ul class="space-y-2">' + ev.included.map(function (x) { return '<li class="flex items-center gap-3 text-sm text-muted-foreground"><svg class="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>' + x + '</li>'; }).join('') + '</ul></div></div><div class="card-adventure p-6 bg-warning/10 border-warning/30"><h3 class="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2"><svg class="w-5 h-5 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg> Requirements</h3><ul class="space-y-2">' + ev.requirements.map(function (x) { return '<li class="flex items-center gap-3 text-sm text-foreground">• ' + x + '</li>'; }).join('') + '</ul></div></div><div class="lg:col-span-1"><div class="card-adventure p-6 sticky top-28 space-y-6"><div class="text-center pb-6 border-b border-border"><div class="flex items-center justify-center gap-2 mb-2"><svg class="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><span class="text-2xl font-bold text-foreground">' + ev.spots + '</span><span class="text-muted-foreground">/ ' + ev.maxSpots + '</span></div><p class="text-sm text-success">Spots remaining</p></div><div class="space-y-4"><div><p class="text-sm text-muted-foreground mb-1">Meeting Point</p><p class="font-semibold text-foreground">' + ev.meetingPoint + '</p></div><div><p class="text-sm text-muted-foreground mb-1">Trip Leader</p><p class="font-semibold text-foreground">' + ev.leader + '</p></div></div><div class="space-y-3 pt-4"><a href="#/register" class="block"><button type="button" class="w-full btn-adventure text-lg py-6">RSVP Now</button></a><div class="flex gap-3"><button type="button" class="flex-1 inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm"><svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> Save</button><button type="button" class="flex-1 inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm"><svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg> Share</button></div></div><p class="text-xs text-muted-foreground text-center">Members only. Not a member? <a href="#/pricing" class="text-primary hover:underline">Join now</a></p></div></div></div></div></section>';
  }

  var blogPosts = [
    { id: 1, title: '10 Essential Hiking Tips for Beginners', excerpt: 'Starting your hiking journey? Here are the most important things every beginner should know before hitting the trails.', image: ASSETS + 'hiking-group.jpg', author: 'Sarah Johnson', date: 'Jan 10, 2026', category: 'Hiking', readTime: '5 min read' },
    { id: 2, title: 'Best Camping Spots in the Mountain Region', excerpt: 'Discover hidden gems and popular destinations for your next overnight adventure under the stars.', image: ASSETS + 'camping-night.jpg', author: 'Mike Chen', date: 'Jan 8, 2026', category: 'Camping', readTime: '7 min read' },
    { id: 3, title: 'Gear Review: Top Kayaks for 2026', excerpt: 'We tested the latest kayaks on the market. Here\'s what you need to know before making your purchase.', image: ASSETS + 'kayaking.jpg', author: 'Emma Williams', date: 'Jan 5, 2026', category: 'Gear', readTime: '8 min read' },
    { id: 4, title: 'Wilderness First Aid: A Complete Guide', excerpt: 'Essential first aid knowledge every outdoor enthusiast should have before venturing into the wild.', image: ASSETS + 'hero-mountain.jpg', author: 'David Park', date: 'Jan 3, 2026', category: 'Safety', readTime: '10 min read' },
    { id: 5, title: 'My Journey to Summit Peak', excerpt: 'A personal account of conquering one of the region\'s most challenging peaks after years of preparation.', image: ASSETS + 'rock-climbing.jpg', author: 'Sarah Johnson', date: 'Dec 28, 2025', category: 'Stories', readTime: '12 min read' },
    { id: 6, title: 'Winter Hiking: Staying Warm and Safe', excerpt: 'Cold weather shouldn\'t stop your adventures. Learn how to prepare for winter trail conditions.', image: ASSETS + 'Winter-Hiking.jpg', author: 'Mike Chen', date: 'Dec 25, 2025', category: 'Hiking', readTime: '6 min read' },
    { id: 7, title: 'Photography Guide: Capturing Mountain Landscapes', excerpt: 'Master the art of outdoor photography with these pro tips for shooting stunning mountain scenery.', image: ASSETS + 'waterfalls.jpg', author: 'Emma Williams', date: 'Dec 20, 2025', category: 'Gear', readTime: '9 min read' }
  ];
  var blogCategories = ['All', 'Hiking', 'Camping', 'Gear', 'Safety', 'Stories'];

  function renderBlogPage() {
    var featured = document.getElementById('blog-featured');
    var grid = document.getElementById('blog-grid');
    var cats = document.getElementById('blog-categories');
    var empty = document.getElementById('blog-empty');
    if (cats) cats.innerHTML = blogCategories.map(function (c) {
      var val = c.toLowerCase();
      return '<button type="button" class="blog-cat-btn px-3 py-1.5 rounded-md text-sm font-medium border border-input ' + (val === 'all' ? 'bg-primary text-primary-foreground' : 'bg-background') + '" data-cat="' + val + '">' + c + '</button>';
    }).join('');
    var fp = blogPosts[0];
    if (featured) featured.innerHTML = '<a href="#/blog/1" class="block group"><div class="grid md:grid-cols-2 gap-8 items-center bg-card rounded-xl p-6 shadow-md"><img src="' + fp.image + '" alt="' + fp.title + '" class="rounded-xl object-cover w-full h-64 md:h-full"/><div><span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-primary text-primary-foreground mb-4">' + fp.category + '</span><h2 class="text-2xl font-bold mb-3 group-hover:text-primary transition">' + fp.title + '</h2><p class="text-muted-foreground mb-4">' + fp.excerpt + '</p><div class="flex gap-4 text-sm text-muted-foreground mb-4"><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> ' + fp.author + '</span><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4M16 2v4M3 10h18M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z"/></svg> ' + fp.date + '</span></div><span class="text-primary flex items-center gap-1 font-semibold">Read Article <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></div></div></a>';
    function updateBlog() {
      var q = (document.getElementById('blog-search') && document.getElementById('blog-search').value) || '';
      var cat = (document.querySelector('.blog-cat-btn[data-cat].bg-primary') && document.querySelector('.blog-cat-btn[data-cat].bg-primary').getAttribute('data-cat')) || 'all';
      var ql = q.toLowerCase();
      var list = blogPosts.slice(1).filter(function (p) {
        var matchSearch = !ql || p.title.toLowerCase().indexOf(ql) >= 0 || p.excerpt.toLowerCase().indexOf(ql) >= 0;
        var matchCat = cat === 'all' || p.category.toLowerCase() === cat;
        return matchSearch && matchCat;
      });
      if (grid) {
        if (list.length === 0) {
          grid.innerHTML = '';
          grid.classList.add('hidden');
          if (empty) empty.classList.remove('hidden');
        } else {
          if (empty) empty.classList.add('hidden');
          grid.classList.remove('hidden');
          grid.innerHTML = '<div class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">' + list.map(function (p) {
            return '<a href="#/blog/' + p.id + '" class="bg-card rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"><img src="' + p.image + '" alt="' + p.title + '" class="h-48 w-full object-cover"/><div class="p-5"><h3 class="font-bold mb-2 hover:text-primary transition">' + p.title + '</h3><p class="text-sm text-muted-foreground mb-4 line-clamp-2">' + p.excerpt + '</p><div class="flex justify-between text-sm text-muted-foreground"><span>' + p.date + '</span><span>' + p.readTime + '</span></div></div></a>';
          }).join('') + '</div>';
        }
      }
    }
    updateBlog();
    document.querySelectorAll('.blog-cat-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.blog-cat-btn').forEach(function (b) {
          b.classList.remove('bg-primary', 'text-primary-foreground');
          b.classList.add('bg-background');
        });
        btn.classList.add('bg-primary', 'text-primary-foreground');
        btn.classList.remove('bg-background');
        updateBlog();
      });
    });
    var searchEl = document.getElementById('blog-search');
    if (searchEl) searchEl.addEventListener('input', updateBlog);
    var clearBtn = document.getElementById('blog-clear-filters');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      if (searchEl) searchEl.value = '';
      document.querySelectorAll('.blog-cat-btn').forEach(function (b) {
        b.classList.remove('bg-primary', 'text-primary-foreground');
        b.classList.add('bg-background');
        if (b.getAttribute('data-cat') === 'all') b.classList.add('bg-primary', 'text-primary-foreground');
      });
      updateBlog();
    });
  }

  function renderBlogDetail() {
    var container = document.getElementById('blog-detail-1');
    if (!container) return;
    var post = blogPosts[0];
    var related = [blogPosts[1], blogPosts[5]];
    container.innerHTML = '<section class="relative h-[40vh] min-h-[300px]"><img src="' + post.image + '" alt="' + post.title + '" class="w-full h-full object-cover"/><div class="absolute inset-0 hero-overlay"></div></section><section class="py-12 bg-background"><div class="container mx-auto px-4"><div class="max-w-3xl mx-auto"><a href="#/blog"><button type="button" class="mb-6 inline-flex items-center text-muted-foreground hover:text-foreground rounded-md px-4 py-2"><svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg> Back to Blog</button></a><span class="inline-flex items-center rounded-full border border-primary text-primary px-2.5 py-0.5 text-xs font-semibold mb-4">' + post.category + '</span><h1 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">' + post.title + '</h1><div class="flex flex-wrap items-center gap-6 pb-8 border-b border-border mb-8"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-full bg-muted"></div><div><p class="font-semibold text-foreground">' + post.author + '</p><p class="text-sm text-muted-foreground">Lead Guide</p></div></div><div class="flex items-center gap-4 text-sm text-muted-foreground"><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4M16 2v4M3 10h18M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z"/></svg> January 10, 2026</span><span class="flex items-center gap-1"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ' + post.readTime + '</span></div></div><article class="prose prose-lg max-w-none text-foreground"><p class="mb-4">Starting your hiking journey can be both exciting and overwhelming. With so many trails to explore and gear to consider, it\'s easy to feel lost before you even hit the path. Here are our top 10 tips to help you get started on the right foot.</p><h2 class="text-2xl font-bold mt-8 mb-4">1. Start Small and Build Up</h2><p class="mb-4">Don\'t try to tackle a 20-mile trail on your first outing. Begin with shorter, well-marked trails and gradually increase difficulty as you build stamina and confidence. A 2-3 mile hike is perfect for beginners.</p><h2 class="text-2xl font-bold mt-8 mb-4">2. Invest in Good Footwear</h2><p class="mb-4">Your feet are your most important hiking equipment. Invest in quality hiking boots or trail shoes that provide proper ankle support and grip. Break them in before any long hikes to prevent blisters.</p><p class="mb-4">Join Adventure Club\'s beginner-friendly hikes to put these tips into practice with experienced guides by your side. We offer weekly events perfect for those just starting their outdoor journey.</p></article><div class="flex items-center gap-4 pt-8 mt-8 border-t border-border"><span class="font-semibold text-foreground">Share:</span><button type="button" class="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border">f</button><button type="button" class="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border">t</button><button type="button" class="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border">in</button></div></div></div></section><section class="py-12 bg-muted/50 border-t border-border"><div class="container mx-auto px-4"><h2 class="font-heading text-2xl font-bold text-foreground mb-8 text-center">Related Articles</h2><div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">' + related.map(function (r) {
      return '<a href="#/blog/' + r.id + '" class="card-adventure group flex gap-4 p-4"><img src="' + r.image + '" alt="' + r.title + '" class="w-24 h-24 object-cover rounded-lg"/><div class="flex-1"><h3 class="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">' + r.title + '</h3><p class="text-sm text-muted-foreground mt-2">' + r.date + '</p></div></a>';
    }).join('') + '</div></div></section>';
  }

  var pricingPlans = [
    { name: 'Explorer', price: '$15', period: '/month', description: 'Perfect for casual adventurers', features: ['Access to 2 events per month', 'Online community access', 'Event notifications', 'Basic gear discounts (10%)', 'Photo gallery access'], notIncluded: ['Equipment rental', 'Priority event registration', 'Expert workshops'], popular: false, cta: 'Get Started' },
    { name: 'Adventurer', price: '$35', period: '/month', description: 'Most popular choice for active members', features: ['Unlimited event access', 'Priority event registration', 'Equipment rental included', 'Premium gear discounts (25%)', 'Monthly workshops', 'Private community channels', 'Trip photos & videos'], notIncluded: ['Personal coaching'], popular: true, cta: 'Join Now' },
    { name: 'Elite', price: '$75', period: '/month', description: 'For serious outdoor enthusiasts', features: ['Everything in Adventurer', 'Personal adventure coaching', 'Custom trip planning', 'VIP event access', 'Gear locker storage', 'Exclusive expeditions', 'First access to new routes', 'Annual gear allowance ($200)'], notIncluded: [], popular: false, cta: 'Go Elite' }
  ];
  var pricingFaq = [
    { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade your membership at any time. Changes take effect at the start of your next billing cycle.' },
    { q: 'Is there a commitment period?', a: 'No long-term commitment required. All memberships are month-to-month and you can cancel anytime.' },
    { q: 'Do you offer family or group discounts?', a: 'Yes! Families get 20% off for additional members. Groups of 5+ can contact us for custom pricing.' },
    { q: "What's included in equipment rental?", a: 'Adventurer and Elite members can borrow hiking gear, camping equipment, kayaks, and climbing gear at no extra cost.' }
  ];

  function renderPricingPage() {
    var plansEl = document.getElementById('pricing-plans');
    var faqEl = document.getElementById('pricing-faq');
    if (plansEl) plansEl.innerHTML = pricingPlans.map(function (plan, i) {
      var popularBadge = plan.popular ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 hero-gradient text-primary-foreground text-sm font-semibold rounded-full flex items-center gap-1 whitespace-nowrap z-10">★ Most Popular</div>' : '';
      var borderClass = plan.popular ? ' border-2 border-primary ring-4 ring-primary/10' : '';
      var featuresHtml = plan.features.map(function (f) { return '<li class="flex items-start gap-3"><svg class="w-5 h-5 text-success flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span class="text-sm text-foreground">' + f + '</span></li>'; }).join('');
      var notHtml = plan.notIncluded.map(function (f) { return '<li class="flex items-start gap-3 opacity-50"><span class="w-5 h-5 flex-shrink-0 mt-0.5 text-center">—</span><span class="text-sm text-muted-foreground">' + f + '</span></li>'; }).join('');
      var btnClass = plan.popular ? 'btn-adventure' : 'btn-outline-adventure';
      return '<div class="relative card-adventure p-8 flex flex-col animate-slide-up overflow-visible' + borderClass + '" style="animation-delay:' + (i * 100) + 'ms">' + popularBadge + '<div class="text-center mb-6"><h3 class="font-heading text-2xl font-bold text-foreground mb-2">' + plan.name + '</h3><p class="text-sm text-muted-foreground mb-4">' + plan.description + '</p><div class="flex items-baseline justify-center gap-1"><span class="font-heading text-5xl font-bold text-foreground">' + plan.price + '</span><span class="text-muted-foreground">' + plan.period + '</span></div></div><ul class="space-y-3 mb-8 flex-1">' + featuresHtml + notHtml + '</ul><a href="#/register"><button type="button" class="w-full ' + btnClass + ' h-11 rounded-md" size="lg">' + plan.cta + ' <svg class="w-4 h-4 ml-2 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button></a></div>';
    }).join('');
    if (faqEl) faqEl.innerHTML = pricingFaq.map(function (faq, i) {
      return '<div class="card-adventure px-6"><button type="button" class="accordion-trigger w-full flex items-center justify-between py-4 font-heading text-lg font-bold text-left" data-state="closed">' + faq.q + '<svg class="h-4 w-4 shrink-0 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button><div class="accordion-content pb-4 pt-0 text-muted-foreground" data-state="closed">' + faq.a + '</div></div>';
    }).join('');
  }

  function initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var content = trigger.nextElementSibling;
        if (!content || !content.classList.contains('accordion-content')) return;
        var isOpen = content.getAttribute('data-state') === 'open';

        // Close all other accordions
        document.querySelectorAll('.accordion-trigger').forEach(function (otherTrigger) {
          if (otherTrigger !== trigger) {
            var otherContent = otherTrigger.nextElementSibling;
            if (otherContent && otherContent.classList.contains('accordion-content')) {
              otherContent.setAttribute('data-state', 'closed');
              otherTrigger.setAttribute('data-state', 'closed');
            }
          }
        });

        // Toggle current accordion
        content.setAttribute('data-state', isOpen ? 'closed' : 'open');
        trigger.setAttribute('data-state', isOpen ? 'closed' : 'open');
      });
    });
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('load', function () {
    var isDark = document.documentElement.classList.contains('dark');
    document.getElementById('theme-icon-sun').classList.toggle('hidden', !isDark);
    document.getElementById('theme-icon-moon').classList.toggle('hidden', isDark);
    document.getElementById('home-dropdown-trigger').addEventListener('click', function (e) {
      e.stopPropagation();
      var content = document.getElementById('home-dropdown-content');
      content.classList.toggle('hidden');
      content.setAttribute('aria-expanded', content.classList.contains('hidden') ? 'false' : 'true');
    });
    document.addEventListener('click', function () {
      var content = document.getElementById('home-dropdown-content');
      if (content && !content.classList.contains('hidden')) content.classList.add('hidden');
    });
    document.getElementById('theme-toggle').addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
      var isDark = document.documentElement.classList.contains('dark');
      document.getElementById('theme-icon-sun').classList.toggle('hidden', !isDark);
      document.getElementById('theme-icon-moon').classList.toggle('hidden', isDark);
    });
    document.getElementById('rtl-toggle').addEventListener('click', function () {
      var dir = document.documentElement.getAttribute('dir');
      document.documentElement.setAttribute('dir', dir === 'rtl' ? 'ltr' : 'rtl');
    });
    document.getElementById('mobile-menu-btn').addEventListener('click', function () {
      var nav = document.getElementById('mobile-nav');
      var menuIcon = document.getElementById('mobile-icon-menu');
      var closeIcon = document.getElementById('mobile-icon-close');
      nav.classList.toggle('hidden');
      if (menuIcon) menuIcon.classList.toggle('hidden', !nav.classList.contains('hidden'));
      if (closeIcon) closeIcon.classList.toggle('hidden', nav.classList.contains('hidden'));
    });
    document.querySelectorAll('#mobile-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.getElementById('mobile-nav').classList.add('hidden');
        document.getElementById('mobile-icon-menu').classList.remove('hidden');
        document.getElementById('mobile-icon-close').classList.add('hidden');
      });
    });
    route();
  });
})();
