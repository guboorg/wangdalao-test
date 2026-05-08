const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const form = document.querySelector('[data-inquiry-form]');
const formStatus = document.querySelector('[data-form-status]');

function closeNav() {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('zksjl-nav-open');
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('zksjl-nav-open', !isOpen);
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
    const invalidField = fields.find((field) => !field.checkValidity());

    fields.forEach((field) => {
      field.toggleAttribute('aria-invalid', !field.checkValidity());
    });

    formStatus.className = 'zksjl-form-status';

    if (invalidField) {
      invalidField.focus();
      formStatus.textContent = 'Please complete the required fields with valid information.';
      formStatus.classList.add('is-error');
      return;
    }

    formStatus.textContent = 'Thank you. This static demo captured your request locally; connect the form to your CRM or email endpoint before launch.';
    formStatus.classList.add('is-success');
    form.reset();
  });

  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
      event.target.toggleAttribute('aria-invalid', !event.target.checkValidity());
    }
  });
}
