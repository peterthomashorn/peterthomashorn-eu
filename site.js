// Set up reveal on scroll
document.addEventListener('DOMContentLoaded', function(event) {
    const frequency = 100;
    var candidates = Array.prototype.slice.call(document.getElementsByClassName('reveal-on-scroll'));

    const updateCandidates = function () {
        const threshold = window.scrollY + window.innerHeight;

        candidates = candidates.filter(candidate => {
            if (candidate.offsetTop < threshold) {
                candidate.classList.add('revealed');
                return false;
            }

            return true;
        });

        if (candidates.length > 0) {
            window.setTimeout(updateCandidates, frequency);
        }
    };

    window.setTimeout(updateCandidates, frequency);
});
