(() => {
  'use strict';

  const menuButton = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  const closeMenu = () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  };

  menuButton.addEventListener('click', () => {
    const opening = !mainNav.classList.contains('open');
    mainNav.classList.toggle('open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  const dialog = document.getElementById('case-dialog');
  const dialogContent = document.getElementById('case-dialog-content');
  const validCases = new Set(['vano', 'tyvon', 'flashstock', 'cantine']);
  let launchButton = null;

  document.querySelectorAll('[data-case-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const caseId = button.dataset.caseOpen;
      if (!validCases.has(caseId)) return;
      const template = document.getElementById('case-' + caseId);
      if (!template) return;
      launchButton = button;
      dialog.setAttribute('aria-labelledby', 'case-' + caseId + '-title');
      dialogContent.replaceChildren(template.content.cloneNode(true));
      document.body.classList.add('modal-open');
      dialog.showModal();
      dialog.querySelector('[data-case-close]')?.focus();
    });
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-case-close]')) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    dialogContent.replaceChildren();
    launchButton?.focus();
  });
})();
