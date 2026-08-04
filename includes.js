async function loadIncludes(){

    const targets = [...document.querySelectorAll("[data-include]")];

    await Promise.all(targets.map(async el => {

        const url = el.getAttribute("data-include");

        try {

            const res = await fetch(url);

            if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);

            el.outerHTML = await res.text();

        } catch(err) {

            console.error(`Failed to load include: ${url}`, err);

            el.innerHTML = `<p style="padding:40px;text-align:center;color:#999;">Section failed to load (${url}). If you're opening this file directly, serve it over a local web server instead — browsers block fetch() on file:// pages.</p>`;

        }

    }));

    document.dispatchEvent(new Event("includes:loaded"));

}

loadIncludes();
