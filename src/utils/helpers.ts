export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as Indexed, result);
}

function isPlainObject(value: unknown): value is Indexed {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function openModal(event: Event, id: string):void {
  event.preventDefault();
  const modal = document.getElementById(id);

  if (modal) {
    modal!.style.display = 'block';
  }
}

export function closeModal(event: Event, id: string):void {
  event.preventDefault();
  const modal = document.getElementById(id);

  if (modal) {
    modal!.style.display = 'none';
  }
}

export function toggleClass(event: Event, id: string):void {
  event.preventDefault();
  const tooltip = document.getElementById(id);

  if (tooltip) {
    if (tooltip.classList.contains('tooltip-active')) {
      tooltip.classList.remove('tooltip-active');
    } else {
      tooltip.classList.add('tooltip-active');
    }
  }
}

export function addClass(id: string):void {
  const prevItem = document.getElementsByClassName('active-section')[0];
  const item = document.getElementById(id);

  if (prevItem) {
    prevItem.classList.remove('active-section');
  }
  item!.classList.add('active-section');
}

type TDate = {
  day: string;
  time: string;
};
export function parsDate(str: string): TDate {
  const strPars = Date.parse(str);
  const date = new Date(strPars);

  const day = date.toLocaleDateString('en-GB');
  const time = date.toLocaleTimeString('en-GB');

  const res : TDate = {
    day,
    time,
  };
  return res;
}
