/*
  Pakāpeniskā pieteikuma forma (kontakti/#konsultacijas).
  - Teksti un apakšpakalpojumi: <script type="application/json" id="request-form-config"> lapā.
  - Iesniegšana: formas atribūts data-endpoint (piem., Formspree adrese). Ja tas ir tukšs,
    forma atver e-pasta programmu ar sagatavotu vēstuli uz data-mailto adresi.
  - Pakalpojumu var iepriekš izvēlēties ar saiti: kontakti/index.html?pakalpojums=apsekosana#konsultacijas
*/
(function () {
  "use strict";

  const form = document.querySelector("[data-request-form]");
  if (!form) return;

  let config;
  try {
    config = JSON.parse(document.getElementById(form.dataset.config).textContent);
  } catch (error) {
    return;
  }

  const t = config.text;
  const find = (selector) => form.querySelector(selector);
  const steps = Array.from(form.querySelectorAll("[data-step]"));
  const last = steps.length - 1;
  const status = find("[data-request-status]");
  const progress = find("[data-progress]");
  const progressLabel = find("[data-progress-label]");
  const progressBar = find("[data-progress-bar]");
  const backButton = find("[data-back]");
  const nextButton = find("[data-next]");
  const submitButton = find("[data-submit]");
  const subGrid = find("[data-subservices]");
  const subTitle = find("[data-subservice-title]");
  const step3Title = find("[data-step3-title]");
  const summary = find("[data-summary]");
  const fileInput = find("[data-file-input]");
  const fileSummary = find("[data-file-summary]");
  const field = (name) => form.elements.namedItem(name);
  const done = document.querySelector("[data-request-done]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const maxUploadBytes = 20 * 1024 * 1024;
  const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "heic"];

  let current = 0;
  let renderedFor = "";
  let pointerChoice = false;
  let advanceTimer = 0;

  const selectedService = () => find("input[name='service']:checked");
  const selectedType = () => find("input[name='serviceType']:checked");
  const isTraining = () => selectedService()?.dataset.key === "apmacibas";

  function setStatus(message, type) {
    status.textContent = message || "";
    status.classList.remove("error", "success");
    if (type) status.classList.add(type);
  }

  function renderSubservices() {
    const service = selectedService();
    if (!service) return;
    subTitle.textContent = service.value;
    if (renderedFor === service.dataset.key) return;
    renderedFor = service.dataset.key;
    const options = (config.subs[renderedFor] || []).slice();
    if (renderedFor !== "cits") options.push(t.unsure);
    subGrid.textContent = "";
    options.forEach((text) => {
      const label = document.createElement("label");
      label.className = "choice-tile choice-tile--compact";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "serviceType";
      input.value = text;
      input.required = true;
      const body = document.createElement("span");
      body.className = "choice-body";
      const check = document.createElement("span");
      check.className = "choice-check";
      check.setAttribute("aria-hidden", "true");
      const title = document.createElement("span");
      title.className = "choice-title";
      title.textContent = text;
      body.append(check, title);
      label.append(input, body);
      subGrid.append(label);
    });
  }

  // 3. solis: apmācībām jautā par dalībniekiem, pārējiem pakalpojumiem par objektu.
  function applyVariant() {
    const variant = isTraining() ? "training" : "object";
    form.querySelectorAll("[data-variant]").forEach((block) => {
      const active = block.dataset.variant === variant;
      block.hidden = !active;
      block.querySelectorAll("input, select, textarea").forEach((input) => {
        input.disabled = !active;
      });
    });
    step3Title.textContent = isTraining() ? t.step3Training : t.step3Object;
  }

  function stepName(index) {
    return index === 2 && isTraining() ? t.trainingStepName : t.stepNames[index];
  }

  function goTo(index, moveFocus) {
    window.clearTimeout(advanceTimer);
    current = index;
    steps.forEach((step, i) => {
      step.hidden = i !== index;
    });
    backButton.hidden = index === 0;
    nextButton.hidden = index === last;
    submitButton.hidden = index !== last;
    progressLabel.textContent =
      t.stepOf.replace("{n}", index + 1).replace("{total}", steps.length) + " · " + stepName(index);
    progressBar.style.width = ((index + 1) / steps.length) * 100 + "%";
    if (index === last) {
      summary.textContent = [selectedService()?.value, selectedType()?.value].filter(Boolean).join(" · ");
    }
    setStatus("");
    clearAllErrors();
    if (moveFocus) {
      const top = progress.getBoundingClientRect().top;
      if (top < 90 || top > window.innerHeight * 0.5) {
        progress.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
      }
      steps[index].querySelector("h3").focus({ preventScroll: true });
    }
  }

  function checkFiles() {
    const files = Array.from(fileInput.files || []);
    const invalid = files.filter(
      (file) => !allowedExtensions.includes((file.name.split(".").pop() || "").toLowerCase())
    );
    if (invalid.length) return t.invalidType + " " + invalid.map((file) => file.name).join(", ");
    if (files.reduce((sum, file) => sum + file.size, 0) > maxUploadBytes) return t.tooLarge;
    return "";
  }

  // Kļūdas teksts parādās tieši zem attiecīgā lauka vai izvēļu grupas.
  function relatedInputs(input) {
    if (input.type === "radio") return Array.from(form.querySelectorAll(`input[name="${input.name}"]`));
    if (input.name === "phone" || input.name === "email") return [field("phone"), field("email")];
    return [input];
  }

  function errorHostFor(input) {
    if (input.type === "radio") return input.closest(".request-fieldset") || input.closest("[role='radiogroup']");
    if (input.name === "phone" || input.name === "email") return input.closest(".request-contact-grid");
    return input.closest("label") || input;
  }

  function clearError(input) {
    relatedInputs(input).forEach((el) => el.removeAttribute("aria-invalid"));
    const note = errorHostFor(input)?.nextElementSibling;
    if (note && note.hasAttribute("data-field-error")) note.remove();
  }

  function clearAllErrors() {
    form.querySelectorAll("[data-field-error]").forEach((note) => note.remove());
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  }

  function fail(input, message) {
    if (!input) {
      setStatus(message, "error");
      return false;
    }
    clearError(input);
    relatedInputs(input).forEach((el) => el.setAttribute("aria-invalid", "true"));
    const note = document.createElement("p");
    note.className = "field-error";
    note.setAttribute("data-field-error", "");
    note.setAttribute("role", "alert");
    note.textContent = message;
    errorHostFor(input).insertAdjacentElement("afterend", note);
    input.focus();
    return false;
  }

  function validateStep(index) {
    clearAllErrors();
    const inputs = Array.from(steps[index].querySelectorAll("input, select, textarea")).filter(
      (input) => !input.disabled && input.type !== "hidden" && input.type !== "file"
    );
    for (const input of inputs) {
      if (input.type === "checkbox" || input.checkValidity()) continue;
      if (input.type === "radio") return fail(input, t.chooseOne);
      if (input.type === "email") return fail(input, t.invalidEmail);
      return fail(input, t.required);
    }
    if (index === last) {
      const phone = field("phone");
      const email = field("email");
      if (!phone.value.trim() && !email.value.trim()) return fail(phone, t.contactRequired);
      if (phone.value.trim() && phone.value.replace(/\D/g, "").length < 6) return fail(phone, t.invalidPhone);
      const fileError = checkFiles();
      if (fileError) return fail(null, fileError);
    }
    const consent = inputs.find((input) => input.type === "checkbox" && !input.checkValidity());
    if (consent) return fail(consent, t.consentRequired);
    return true;
  }

  function next() {
    window.clearTimeout(advanceTimer);
    if (!validateStep(current)) return;
    if (current === 0) {
      renderSubservices();
      applyVariant();
    }
    if (current < last) goTo(current + 1, true);
  }

  function buildSubject() {
    const type = selectedType()?.value;
    return [
      t.subjectPrefix + ": " + (selectedService()?.value || ""),
      type && type !== t.unsure ? type : "",
      field("name").value.trim(),
    ]
      .filter(Boolean)
      .join(" · ");
  }

  function describe(data) {
    return Object.keys(config.labels)
      .map((key) => {
        const value = data.get(key);
        return typeof value === "string" && value.trim() ? config.labels[key] + ": " + value.trim() : "";
      })
      .filter(Boolean)
      .join("\n");
  }

  function showDone() {
    form.hidden = true;
    done.hidden = false;
    done.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    done.focus({ preventScroll: true });
  }

  nextButton.addEventListener("click", next);
  backButton.addEventListener("click", () => goTo(Math.max(0, current - 1), true));
  find("[data-edit]").addEventListener("click", () => goTo(0, true));

  // Ar peli vai pirkstu izvēlēta kartīte uzreiz ved uz nākamo soli.
  // Ar klaviatūru (bultiņas) izvēle tikai atzīmē variantu; tālāk ar pogu vai Enter.
  form.addEventListener("pointerdown", (event) => {
    pointerChoice = Boolean(event.target.closest(".choice-tile"));
  });
  form.addEventListener("keydown", (event) => {
    pointerChoice = false;
    if (event.key === "Enter" && current < last && event.target.tagName === "INPUT") {
      event.preventDefault();
      next();
    }
  });
  form.addEventListener("click", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "radio" || !pointerChoice) return;
    if (input.name !== "service" && input.name !== "serviceType") return;
    pointerChoice = false;
    window.clearTimeout(advanceTimer);
    advanceTimer = window.setTimeout(next, 220);
  });

  form.addEventListener("change", (event) => {
    const input = event.target;
    if (input.type === "radio" || input.type === "checkbox") clearError(input);
    if (input.name === "service") applyVariant();
    if (input === fileInput) {
      const files = Array.from(fileInput.files || []);
      const error = checkFiles();
      const count = files.length;
      const word = count % 10 === 1 && count % 100 !== 11 ? t.fileOne : t.fileMany;
      const totalMb = (files.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(1);
      fileSummary.textContent = error || (count ? `${count} ${word}, ${totalMb} MB ${t.total}.` : "");
      fileSummary.className = "file-summary" + (error ? " error" : "");
    }
    if (status.classList.contains("error")) setStatus("");
  });
  form.addEventListener("input", (event) => {
    const input = event.target;
    if (input.type !== "radio" && input.type !== "checkbox" && input.hasAttribute("aria-invalid")) clearError(input);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (current !== last) {
      next();
      return;
    }
    if (!validateStep(last)) return;
    if (field("website").value) {
      showDone();
      return;
    }

    const data = new FormData(form);
    data.delete("website");
    if (!(fileInput.files || []).length) data.delete("files");
    Array.from(data.keys()).forEach((key) => {
      if (data.getAll(key).every((value) => typeof value === "string" && !value.trim())) data.delete(key);
    });
    data.set("subject", buildSubject());
    data.set("pageUrl", window.location.href);

    const endpoint = (form.dataset.endpoint || "").trim();
    if (!endpoint) {
      window.location.href =
        "mailto:" + form.dataset.mailto +
        "?subject=" + encodeURIComponent(buildSubject()) +
        "&body=" + encodeURIComponent(describe(data));
      setStatus(t.mailtoOpened + ((fileInput.files || []).length ? " " + t.mailtoFiles : ""), "success");
      return;
    }

    submitButton.disabled = true;
    setStatus(t.sending);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      showDone();
    } catch (error) {
      setStatus(t.sendError, "error");
    } finally {
      submitButton.disabled = false;
    }
  });

  const preset = new URLSearchParams(window.location.search).get("pakalpojums");
  const presetInput = Array.from(form.querySelectorAll("input[name='service']")).find(
    (input) => input.dataset.key === preset
  );
  if (presetInput) {
    presetInput.checked = true;
    renderSubservices();
    applyVariant();
    goTo(1, false);
  } else {
    applyVariant();
    goTo(0, false);
  }
})();
