console.log("HelloWorld");

document.addEventListener("DOMContentLoaded", function() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach((scrollLink) => {
      scrollLink.addEventListener("click", (e) => {
        e.preventDefault();
  
        const hrefLink = scrollLink.getAttribute("href");
        const targetContent = document.getElementById(hrefLink.replace("#", ""));
  
        if (targetContent) {
          const rectTop = targetContent.getBoundingClientRect().top;
          const positionY = window.pageYOffset;
          const target = rectTop - 50 + positionY;
  
          window.scrollTo({
            top: target,
            behavior: "smooth",
          });
        }
      });
    });
  });