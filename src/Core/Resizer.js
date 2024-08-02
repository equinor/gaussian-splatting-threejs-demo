const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};


class Resizer {

  static listenForResize(container, camera, renderer) {
    setSize(container, camera, renderer);
    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);
    });

    document.addEventListener('DOMContentLoaded', (event) => {
      const tab = document.getElementById('tab');
      const handle = document.getElementById('drag-handle');
      const canvas = document.querySelector('canvas');
      
      let isDragging = false;
      
      handle.addEventListener('mousedown', (e) => {
        isDragging = true;
      });
      
      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        let newWidth = e.clientX;
        if (newWidth < 0) newWidth = 0; // minimum width
        if (newWidth > window.innerWidth - 50) newWidth = window.innerWidth - 50; // maximum width
    
        tab.style.width = newWidth + 'px';
        handle.style.left = newWidth + 'px';
        canvas.style.left = newWidth + 'px';
        canvas.style.width = (window.innerWidth - newWidth) + 'px';
        setSize(container, camera, renderer);

      });
      
      document.addEventListener('mouseup', (e) => {

        isDragging = false;
      });
    });
  }
}

export { Resizer };
