import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '@/lib/store';

export function useTracking() {
  const location = useLocation();
  const params = useParams();
  const trackActivity = useStore((state) => state.trackActivity);
  const deeds = useStore((state) => state.deeds);
  
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);

    const track = async () => {
      // Get device model and network information
      const deviceModel = getDeviceModel();
      const networkInfo = await getNetworkInfo();
      
      // Find related deed if we're on a deed detail page
      const relatedDeed = params.slug ? deeds.find(d => d.slug === params.slug) : undefined;

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: true
          });
        });

        const locationStr = `${position.coords.latitude},${position.coords.longitude}`;
        
        trackActivity({
          timestamp: new Date().toISOString(),
          path: location.pathname + location.search,
          userAgent: navigator.userAgent,
          deviceModel,
          deviceType: getDeviceType(),
          networkType: networkInfo.type,
          connection: networkInfo.connection,
          location: locationStr,
          sessionId,
          relatedDeedId: relatedDeed?.id
        });
      } catch {
        // If geolocation fails, track without location
        trackActivity({
          timestamp: new Date().toISOString(),
          path: location.pathname + location.search,
          userAgent: navigator.userAgent,
          deviceModel,
          deviceType: getDeviceType(),
          networkType: networkInfo.type,
          connection: networkInfo.connection,
          sessionId,
          relatedDeedId: relatedDeed?.id
        });
      }
    };

    track();
  }, [location, trackActivity, params, deeds]);
}

function getDeviceModel() {
  const ua = navigator.userAgent;
  const matches = ua.match(/\(([^)]+)\)/);
  return matches ? matches[1] : 'Unknown Device';
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

async function getNetworkInfo() {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;

  if (connection) {
    return {
      type: connection.type || 'unknown',
      connection: {
        downlink: connection.downlink || 0,
        effectiveType: connection.effectiveType || 'unknown',
        rtt: connection.rtt || 0
      }
    };
  }

  return {
    type: 'unknown',
    connection: {
      downlink: 0,
      effectiveType: 'unknown',
      rtt: 0
    }
  };
}