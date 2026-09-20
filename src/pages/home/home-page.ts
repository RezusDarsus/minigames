import { gameCards, leaderboardPlayers, type GameCard } from '../../data/home-data';

type AuthMode = 'login' | 'register';

const assets = {
  arrowBack: new URL('../../assets/icons/arrow-back.png', import.meta.url).href,
  arrowForward: new URL('../../assets/icons/arrow-forward.png', import.meta.url).href,
  developer: new URL('../../assets/images/figma-07.png', import.meta.url).href,
  heart: new URL('../../assets/icons/figma-01.svg', import.meta.url).href,
  logo: new URL('../../assets/images/figma-05.png', import.meta.url).href,
  menu: new URL('../../assets/icons/figma-02.svg', import.meta.url).href,
  star: new URL('../../assets/icons/figma-03.svg', import.meta.url).href,
  upload: new URL('../../assets/icons/figma-06.svg', import.meta.url).href,
} as const;

const navigation: readonly string[] = ['Home', 'Library', 'Tournaments', 'Community'];

const selectRequired = <ElementType extends Element>(
  root: ParentNode,
  selector: string,
): ElementType => {
  const element: Element | null = root.querySelector(selector);
  if (!element) throw new Error(`Expected element was not found: ${selector}`);
  return element as ElementType;
};

const cardMarkup = (game: GameCard): string => `
  <article class="game-card game-card--${game.size}">
    <img class="game-card__image" src="${game.image}" alt="${game.title}" />
    <div class="game-card__overlay"><h3>${game.title}</h3><div class="game-card__meta"><span><img src="${assets.star}" alt="" />${game.rating}</span><span><img src="${assets.heart}" alt="" />${game.likes}</span></div></div>
  </article>`;

const playerRows = (): string =>
  leaderboardPlayers
    .map(
      (player) => `
  <tr><td class="rank">#${player.rank}</td><td class="player"><span class="avatar">${player.initials}</span><span>${player.name}</span></td><td class="games-played">${player.gamesPlayed}</td><td>${player.score}</td><td><span class="streak">🔥</span> ${player.streak}</td><td class="favorite-game"><span>${player.favoriteGame}</span></td></tr>`,
    )
    .join('');

const authForm = (mode: AuthMode): string => {
  const isLogin = mode === 'login';
  const heading = isLogin ? 'Welcome Back!' : 'Create an Account';
  const description = isLogin
    ? 'Sign in to resume your games and progress.'
    : 'Join MiniGames to track your score & streak.';
  return `
    <form class="auth-form auth-form--${mode}" novalidate>
      <div class="auth-tabs" role="tablist" aria-label="Authentication options"><button class="auth-tabs__button ${isLogin ? 'is-active' : ''}" type="button" role="tab" aria-selected="${isLogin}" data-auth-mode="login">Login</button><button class="auth-tabs__button ${isLogin ? '' : 'is-active'}" type="button" role="tab" aria-selected="${!isLogin}" data-auth-mode="register">Register</button></div>
      <div class="auth-form__heading"><h2 id="auth-dialog-title">${heading}</h2><p>${description}</p></div>
      <div class="auth-form__fields">
        ${isLogin ? '' : '<label>Username<input type="text" name="username" autocomplete="username" placeholder="e.g. CozyGamer_99" required /></label>'}
        <label>Email Address<input type="email" name="email" autocomplete="email" placeholder="your.email@domain.com" required /></label>
        <label>Password<input type="password" name="password" autocomplete="${isLogin ? 'current-password' : 'new-password'}" placeholder="${isLogin ? '••••••••' : 'Min. 8 characters'}" minlength="8" required /></label>
        ${isLogin ? '<button class="auth-form__forgot" type="button">Forgot Password?</button>' : '<label>Confirm Password<input type="password" name="confirm-password" autocomplete="new-password" placeholder="Repeat your password" minlength="8" required /></label>'}
      </div>
      <p class="auth-form__message" data-auth-message role="status" aria-live="polite"></p>
      <div class="auth-form__actions"><button class="button button--primary button--wide" type="submit">${isLogin ? 'Login' : 'Create Account'}</button><div class="or-divider"><span>OR</span></div><button class="button button--google button--wide" type="button"><span class="google-mark">G</span>${isLogin ? 'Continue' : 'Sign up'} with Google</button></div>
      <p class="auth-form__footer">${isLogin ? "Don't have an account?" : 'Already have an account?'} <button type="button" class="auth-form__text-action" data-auth-mode="${isLogin ? 'register' : 'login'}">${isLogin ? 'Register' : 'Login'}</button></p>
    </form>`;
};

const homeMarkup = (): string => `
  <div class="site-shell">
    <header class="site-header"><a class="brand" href="#home" aria-label="MiniGames home"><img src="${assets.logo}" alt="" /><span>MiniGames</span></a><nav class="desktop-nav" aria-label="Primary navigation">${navigation.map((item) => `<a class="${item === 'Home' ? 'is-current' : ''}" href="#${item.toLowerCase()}">${item}</a>`).join('')}</nav><div class="header-actions"><button class="button button--outline" type="button" data-open-auth="login">Log In</button><button class="button button--primary header-sign-up" type="button" data-open-auth="register">Sign Up</button></div><button class="menu-button" type="button" data-open-menu aria-label="Open navigation menu"><img src="${assets.menu}" alt="" /></button></header>
    <aside class="mobile-menu" aria-label="Mobile navigation" aria-hidden="true"><div class="mobile-menu__top"><a class="brand" href="#home"><img src="${assets.logo}" alt="" /><span>MiniGames</span></a><button class="close-button" type="button" data-close-menu aria-label="Close navigation menu">×</button></div><nav>${navigation.map((item) => `<a href="#${item.toLowerCase()}" data-close-menu>${item}</a>`).join('')}</nav><div class="mobile-menu__actions"><button class="button button--outline button--wide" type="button" data-open-auth="login">Log In</button><button class="button button--primary button--wide" type="button" data-open-auth="register">Sign Up</button></div></aside>
    <main id="home">
      <section class="hero"><div class="hero__content"><h1>Take a Short Break &amp; Have Fun</h1><p>Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.</p><a class="button button--primary" href="#library">Browse Library</a></div></section>
      <section class="section new-games" aria-labelledby="new-games-title"><div class="section-heading section-heading--with-actions"><h2 id="new-games-title">New Games</h2><div class="carousel-actions"><button type="button" data-carousel-direction="previous" aria-label="Previous games"><img src="${assets.arrowBack}" alt="" /></button><button class="is-primary" type="button" data-carousel-direction="next" aria-label="Next games"><img src="${assets.arrowForward}" alt="" /></button></div></div><div class="game-carousel">${gameCards.map((game) => cardMarkup(game)).join('')}</div></section>
      <section class="section leaderboard" aria-labelledby="leaderboard-title"><div class="section-heading"><h2 id="leaderboard-title">Top Players This Week</h2></div><div class="leaderboard__table-wrap"><table><thead><tr><th>Rank</th><th>Player</th><th class="games-played">Games Played</th><th>Score</th><th>Streak</th><th class="favorite-game">Favorite Game</th></tr></thead><tbody>${playerRows()}</tbody></table></div></section>
      <section class="developer-section" aria-labelledby="developer-title"><img class="developer-section__art" src="${assets.developer}" alt="A game developer's workspace illustration" /><div class="developer-section__content"><h2 id="developer-title">Are You a Game Developer?</h2><p>Want to see your game on MiniGames? We’re always looking for fun, engaging mini games to add to our platform. Submit your game and reach thousands of players!</p><button class="button button--primary" type="button"><img src="${assets.upload}" alt="" />Submit Form</button><small>or contact us at developers@minigames.com</small></div></section>
    </main>
    <footer class="site-footer"><div class="site-footer__top"><div class="footer-intro"><a class="brand" href="#home"><img src="${assets.logo}" alt="" /><span>MiniGames</span></a><p>Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.</p></div><div class="footer-links"><div><h3>Explore</h3><a href="#home">Home</a><a href="#library">Library</a><a href="#categories">Categories</a><a href="#tournaments">Tournaments</a></div><div><h3>Company</h3><a href="#about">About Us</a><a href="#contact">Contact</a><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a></div><div><h3>Community</h3><div class="social-links"><a href="#share" aria-label="Share">↗</a><a href="#chat" aria-label="Chat">◉</a><a href="#rss" aria-label="RSS feed">◔</a></div></div></div></div><div class="site-footer__bottom"><span>© 2026 MiniGames. All rights reserved.</span><a href="https://rs.school/courses/short-track">RS School</a><a href="https://github.com/RezusDarsus">@student-nickname</a><span>Designed with love</span></div></footer>
    <dialog class="auth-dialog" aria-labelledby="auth-dialog-title"><div class="auth-dialog__inner"><button class="close-button auth-dialog__close" type="button" data-close-auth aria-label="Close authentication dialog">×</button><div class="auth-dialog__content"></div></div></dialog>
  </div>`;

export const renderHomePage = (root: HTMLElement): void => {
  root.innerHTML = homeMarkup();
  const shell = selectRequired<HTMLElement>(root, '.site-shell');
  const dialog = selectRequired<HTMLDialogElement>(root, '.auth-dialog');
  const authContent = selectRequired<HTMLElement>(dialog, '.auth-dialog__content');
  const mobileMenu = selectRequired<HTMLElement>(root, '.mobile-menu');
  const gameCarousel = selectRequired<HTMLElement>(root, '.game-carousel');
  const closeMenu = (): void => {
    shell.classList.remove('is-menu-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };
  const setAuthMode = (mode: AuthMode): void => {
    authContent.classList.add('is-changing');
    globalThis.setTimeout(() => {
      authContent.innerHTML = authForm(mode);
      authContent.classList.remove('is-changing');
    }, 120);
  };
  const openAuth = (mode: AuthMode): void => {
    closeMenu();
    setAuthMode(mode);
    if (!dialog.open) dialog.showModal();
  };
  const rotateGameCards = (direction: 'next' | 'previous'): void => {
    const cards = [...gameCarousel.children];
    const edgeCard = direction === 'next' ? cards[0] : cards.at(-1);
    if (edgeCard) gameCarousel[direction === 'next' ? 'append' : 'prepend'](edgeCard);
  };
  root.addEventListener('click', (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const authButton = target.closest<HTMLElement>('[data-open-auth]');
    if (authButton) {
      openAuth(authButton.dataset.openAuth === 'register' ? 'register' : 'login');
      return;
    }
    if (target.closest('[data-open-menu]')) {
      shell.classList.add('is-menu-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      return;
    }
    if (target.closest('[data-close-menu]')) {
      closeMenu();
      return;
    }
    if (target.closest('[data-close-auth]')) {
      dialog.close();
      return;
    }
    const carouselButton = target.closest<HTMLElement>('[data-carousel-direction]');
    if (carouselButton) {
      rotateGameCards(
        carouselButton.dataset.carouselDirection === 'previous' ? 'previous' : 'next',
      );
      return;
    }
    const modeButton = target.closest<HTMLElement>('[data-auth-mode]');
    if (modeButton)
      setAuthMode(modeButton.dataset.authMode === 'register' ? 'register' : 'login');
  });
  dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('input', (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const form = target.closest<HTMLFormElement>('.auth-form');
    if (!form) return;
    const confirmPassword = form.elements.namedItem('confirm-password');
    if (confirmPassword instanceof HTMLInputElement)
      confirmPassword.setCustomValidity('');
    form.classList.remove('is-submitted', 'is-success');
    selectRequired<HTMLElement>(form, '[data-auth-message]').textContent = '';
  });
  dialog.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const password = form.elements.namedItem('password');
    const confirmPassword = form.elements.namedItem('confirm-password');
    if (
      password instanceof HTMLInputElement &&
      confirmPassword instanceof HTMLInputElement &&
      password.value !== confirmPassword.value
    )
      confirmPassword.setCustomValidity('Passwords do not match.');
    form.classList.add('is-submitted');
    if (!form.checkValidity()) {
      selectRequired<HTMLElement>(form, '[data-auth-message]').textContent =
        'Please complete the highlighted fields.';
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }
    form.classList.remove('is-submitted');
    form.classList.add('is-success');
    selectRequired<HTMLElement>(form, '[data-auth-message]').textContent =
      'Thanks — your details are valid. Authentication will connect in a later story.';
  });
};
